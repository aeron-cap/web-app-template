import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/drizzle/drizzle.provider';
import * as sc from '../../db/schema';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { eq } from 'drizzle-orm';
import { getTableColumns } from 'drizzle-orm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof sc>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const { password, ...rest } = getTableColumns(sc.usersTable);
    const [user] = await this.db
      .select({
        ...rest,
      })
      .from(sc.usersTable)
      .where(eq(sc.usersTable.id, payload.sub));

    if (!user) return null;
    return user;
  }
}
