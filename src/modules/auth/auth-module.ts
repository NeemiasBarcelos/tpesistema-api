import { Module } from '@nestjs/common'
import { AuthenticateController } from './auth-controller'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user.use-case'
import { DrizzleUsersRepository } from '@/infra/repositories/drizzle-users.repository'
import { USERS_REPOSITORY } from '@/infra/repositories/tokens'

@Module({
  controllers: [AuthenticateController],
  providers: [
    AuthenticateUserUseCase,
    {
      provide: USERS_REPOSITORY,
      useClass: DrizzleUsersRepository,
    },
  ],
  exports: [AuthenticateUserUseCase],
})
export class AuthModule {}