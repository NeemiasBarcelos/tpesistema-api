import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { z } from 'zod'
import { BadRequestException } from '@nestjs/common'

describe('ZodValidationPipe', () => {
  const schema = z.object({
    email: z.string().email(),
  })

  const pipe = new ZodValidationPipe(schema)

  it('should pass validation with correct data', () => {
    const result = pipe.transform({ email: 'valid@email.com' })
    expect(result).toEqual({ email: 'valid@email.com' })
  })

  it('should throw BadRequestException with invalid data', () => {
    expect(() => pipe.transform({ email: 'invalid' })).toThrow(BadRequestException)
  })
})