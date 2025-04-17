import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticateController } from '@/modules/auth/auth-controller'
import { AuthenticateUserUseCase } from '@/modules/use-cases/authenticate-user.use-case'

describe('AuthenticateController', () => {
  let controller: AuthenticateController
  let authenticateUseCase: AuthenticateUserUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticateController],
      providers: [
        {
          provide: AuthenticateUserUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              user: {
                username: 'Admin',
                role: 'admin',
                avatarUrl: 'https://i.pravatar.cc/300',
              },
            }),
          },
        },
      ],
    }).compile()

    controller = module.get(AuthenticateController)
    authenticateUseCase = module.get(AuthenticateUserUseCase)
  })

  it('should return a user on valid credentials', async () => {
    const result = await controller.handle({
      email: 'admin@gmail.com',
      password: '123456',
    })

    expect(result).toEqual({
      user: {
        username: 'Admin',
        role: 'admin',
        avatarUrl: 'https://i.pravatar.cc/300',
      },
    })

    expect(authenticateUseCase.execute).toHaveBeenCalled()
  })
})