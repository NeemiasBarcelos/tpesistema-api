import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user.use-case'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const authenticateBodySchema = z.object({
  email: z.string().email({ message: 'Informe um email válido.' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres.' }),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/auth')
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post('signin')
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({
      email,
      password,
    })

    return {
      user: result.user,
    }
  }
}