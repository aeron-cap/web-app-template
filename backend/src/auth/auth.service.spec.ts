import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as sc from '../db/schema';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { ForbiddenException } from '@nestjs/common';

jest.mock('argon2');

/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

describe('AuthService', () => {
  let authService: AuthService;
  let dbMock: DeepMockProxy<NodePgDatabase<typeof sc>>;
  let configMock: Partial<Record<keyof ConfigService, jest.Mock>>;
  let jwtMock: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    dbMock = mockDeep<NodePgDatabase<typeof sc>>();

    configMock = {
      get: jest.fn(),
    };

    jwtMock = {
      signAsync: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: DRIZZLE,
          useValue: dbMock,
        },
        {
          provide: ConfigService,
          useValue: configMock,
        },
        {
          provide: JwtService,
          useValue: jwtMock,
        },
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should create a user', async () => {
    const mockUserCreate: CreateUserDto = {
      name: 'Test User',
      username: 'testuser',
      password: 'password',
      email: 'test@gmail.com',
    };

    dbMock.transaction.mockImplementation(async (callback) => {
      const txMock = {
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        returning: jest
          .fn()
          .mockResolvedValue([{ id: '1', ...mockUserCreate }]),
      };
      return callback(txMock);
    });

    const result = await authService.createUser(mockUserCreate);
    expect(result).toEqual({ message: 'User created successfully' });
  });

  it('should log in when credentials are correct', async () => {
    const mockLogin: LoginDto = {
      email: 'test@gmail.com',
      password: 'hashed-password',
    };

    const mockUser = {
      email: 'test@gmail.com',
      password: 'hashed-password',
    };

    dbMock.select.mockReturnThis();
    dbMock.from.mockReturnThis();
    dbMock.where.mockResolvedValue([mockUser]);

    (argon2.verify as jest.Mock).mockResolvedValue(true);

    const result = await authService.login(mockLogin);

    expect(result).toEqual({ message: 'Login successful' });
  });

  it('should not login when credentials are incorrect', async () => {
    const mockLogin: LoginDto = {
      email: 'test@gmail.com',
      password: 'password',
    };

    const mockUser = {
      email: 'test@gmail.com',
      password: 'hashed-password',
    };

    dbMock.select.mockReturnThis();
    dbMock.from.mockReturnThis();
    dbMock.where.mockResolvedValue([mockUser]);

    (argon2.verify as jest.Mock).mockResolvedValue(false);

    await expect(authService.login(mockLogin)).rejects.toThrow(
      ForbiddenException,
    );
  });
});
