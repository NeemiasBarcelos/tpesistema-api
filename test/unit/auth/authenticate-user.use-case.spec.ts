import { UsersRepository } from '@/infra/repositories/users-repository'
import { User } from '@/domain/entities/user'
import { hash } from 'bcryptjs'
import { UnauthorizedException } from '@nestjs/common'
import { AuthenticateUserUseCase } from '@/modules/use-cases/authenticate-user.use-case'

describe('AuthenticateUserUseCase', () => {
  let usersRepository: UsersRepository
  let useCase: AuthenticateUserUseCase

  beforeEach(async () => {
    usersRepository = {
      findByEmail: jest.fn(),
    }

    useCase = new AuthenticateUserUseCase(usersRepository)
  })

  it('should authenticate user with correct credentials', async () => {
    const passwordHash = await hash('123456', 6)

    const mockUser = new User(
      'user-1',
      'Test User',
      'test@example.com',
      passwordHash,
      'admin',
      'https://avatar',
      'cong-1',
      new Date(),
    )

    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(mockUser)

    const result = await useCase.execute({
      email: 'test@example.com',
      password: '123456',
    })

    expect(result.user).toEqual({
      username: 'Test User',
      role: 'admin',
      avatarUrl: 'https://avatar',
    })
  })

  it('should throw error if user not found', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(null)

    await expect(
      useCase.execute({ email: 'notfound@example.com', password: '123456' })
    ).rejects.toBeInstanceOf(UnauthorizedException)
  })

  it('should throw error if password is incorrect', async () => {
    const passwordHash = await hash('123456', 6)

    const mockUser = new User(
      'user-1',
      'Test User',
      'test@example.com',
      passwordHash,
      'admin',
      'https://avatar',
      'cong-1',
      new Date(),
    )

    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(mockUser)

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'wrongpass' })
    ).rejects.toBeInstanceOf(UnauthorizedException)
  })
})