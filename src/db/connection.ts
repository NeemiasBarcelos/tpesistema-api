import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const connectionString = env.DATABASE_URL
export const db = drizzle(connectionString, { schema })