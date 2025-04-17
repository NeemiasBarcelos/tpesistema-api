import { Injectable, Inject, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { User } from '@/domain/entities/user'
import { UsersRepository } from '@/infra/repositories/users-repository'
import { USERS_REPOSITORY } from '@/infra/repositories/tokens'

interface AuthenticateUserInput {
  email: string
  password: string
}

interface AuthenticateUserOutput {
  user: Pick<User, 'username' | 'role' | 'avatarUrl'>
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.')
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      throw new UnauthorizedException('E-mail ou senha inválidos.')
    }

    return {
      user: {
        username: user.username,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    }
  }
}