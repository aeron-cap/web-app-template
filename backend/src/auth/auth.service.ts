import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import * as sc from '../db/schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE)
    private db: NodePgDatabase<typeof sc>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const hash = await argon2.hash(dto.password);
    dto.password = hash;
    const user = await this.db.transaction(async (tx) => {
      const [user] = await tx.insert(sc.usersTable).values(dto).returning();
      return user;
    });

    if (!user) {
      throw new ForbiddenException('Cannot create user at this moment');
    }

    return {
      message: 'User created successfully',
    };
  }

  async login(dto: LoginDto) {
    const [user] = await this.db
      .select()
      .from(sc.usersTable)
      .where(eq(sc.usersTable.email, dto.email));
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordMatch = await argon2.verify(user.password, dto.password);
    if (!passwordMatch) throw new ForbiddenException('Credentials incorrect');

    return {
      message: 'Login successful',
    };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get<string>('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
