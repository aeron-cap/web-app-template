import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../drizzle/drizzle.provider';
import * as sc from '../../db/schema';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { eq } from 'drizzle-orm';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof sc>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookies = request?.cookies as
            | Record<string, string>
            | undefined;
          return cookies?.access_token || null;
        },
      ]),
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const [user] = await this.db
      .select({
        id: sc.usersTable.id,
        email: sc.usersTable.email,
        username: sc.usersTable.username,
        name: sc.usersTable.name,
        isAdmin: sc.usersTable.isAdmin,
        createdAt: sc.usersTable.createdAt,
        editedAt: sc.usersTable.editedAt,
      })
      .from(sc.usersTable)
      .where(eq(sc.usersTable.id, payload.sub));

    if (!user) return null;
    return user;
  }
}
