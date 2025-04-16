import { UsersRepository } from '@/infra/repositories/users-repository'
import { db } from '@/db/connection'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import { User } from '@/domain/entities/user'

export class DrizzleUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    const raw = result[0]
    if (!raw) return null

    // Protege contra valores nulos não esperados pela entidade
    if (!raw.passwordHash) return null

    return new User(
      raw.id,
      raw.username,
      raw.email,
      raw.passwordHash,
      raw.role,
      raw.avatarUrl ?? '',
      raw.congregationId ?? undefined,
      raw.createdAt ?? undefined
    )
  }
}