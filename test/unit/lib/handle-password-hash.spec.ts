import { hashPassword } from '@/lib/handle-password-hash'
import { compare } from 'bcryptjs'

describe('hashPassword', () => {
  it('should hash and match password correctly', async () => {
    const password = '123456'
    const hash = await hashPassword(password)
    const result = await compare(password, hash)

    expect(result).toBe(true)
  })
})