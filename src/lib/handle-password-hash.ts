import { hash } from 'bcryptjs'

export async function hashPassword(plain: string): Promise<string> {
  return hash(plain, 8)
}