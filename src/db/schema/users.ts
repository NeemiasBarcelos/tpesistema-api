import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { congregations } from '@/db/schema'
import { roleEnum } from './enums'

export const users = pgTable('users', {
  id: text('id').$defaultFn(createId).primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  congregationId: text('congregation_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  avatarUrl: text('avatar_url'),
  role: roleEnum().notNull().default('user'),
})

export const usersRelations = relations(users, ({ one }) => ({
  congregation: one(congregations, {
    fields: [users.congregationId],
    references: [congregations.id],
  }),
}))