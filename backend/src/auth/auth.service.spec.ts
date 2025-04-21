import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserRepository: { findOneBy: jest.Mock };

  const mockUser = {
    id: 1,
    username: 'testUser',
    password: '$2b$10$fakeHashForTesting',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    mockUserRepository = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should validate and return user without password if credentials are correct', async () => {
    mockUserRepository.findOneBy.mockResolvedValue(mockUser);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(async () => await Promise.resolve(true));

    await expect(
      service.validateUser('testUser', 'somePassword'),
    ).resolves.toEqual({
      id: mockUser.id,
      username: mockUser.username,
      createdAt: mockUser.createdAt,
    });
  });
  it('should throw UnauthorizedException if user is not found', async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null);

    await expect(
      service.validateUser('nonexistentUser', 'anyPassword'),
    ).rejects.toThrow('User not found');
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    mockUserRepository.findOneBy.mockResolvedValue(mockUser);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(async () => await Promise.resolve(false));

    await expect(
      service.validateUser('testUser', 'wrongPassword'),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should return access token for valid user', () => {
    const mockPayload = {
      id: mockUser.id,
      username: mockUser.username,
    };

    const mockToken = 'mocked-jwt-token';

    jest.spyOn(service['jwtService'], 'sign').mockReturnValue(mockToken);

    const result = service.login(mockPayload);

    expect(result).toEqual({ access_token: mockToken });
  });

  it('should throw if user data is incomplete', () => {
    const invalidUser = {};
    // @ts-expect-error Ignore type error to call login with invalid user
    expect(() => service.login(invalidUser)).toThrow();
  });

  it('should throw if jwtService is not available', () => {
    // @ts-expect-error force the manipulation for the test
    service['jwtService'] = null;

    expect(() => service.login({ id: 1, username: 'admin' })).toThrow();
  });
});
