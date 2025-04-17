import { createId } from '@paralleldrive/cuid2'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'

export const congregations = pgTable('congregations', {
  id: text('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
})

export const congregationsRelations = relations(congregations, ({ many }) => ({
  users: many(users),
}))