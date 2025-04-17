import { reset } from 'drizzle-seed'
import { db } from '@/db/connection'
import * as schema from '@/db/schema'
import { users } from '@/db/schema/users'
import { congregations } from '@/db/schema/congregations'
import { hashPassword } from '@/lib/handle-password-hash'

async function seed() {
  try {

    await reset(db, schema)
    console.log('✅ Database was reset successfully!')

    const [createdCongregation] = await db
      .insert(congregations)
      .values({
        name: 'Congregação Central',
      })
      .returning({ id: congregations.id })

    console.log('✅ Congregação criada com sucesso!')

    await db.insert(users).values([
      {
        username: 'Admin',
        email: 'admin@gmail.com',
        passwordHash: await hashPassword('123456'),
        role: 'admin',
        avatarUrl: 'https://i.pravatar.cc/300',
        congregationId: createdCongregation.id,
      },
    ])

    console.log('✅ Usuário Admin criado com sucesso!')
  } catch (err) {
    console.error('❌ Erro ao executar seed:', err)
  } finally {
    console.log('✅ Processo de seed finalizado.')
    process.exit(0)
  }
}

seed()