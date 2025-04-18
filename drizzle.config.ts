import { defineConfig } from 'drizzle-kit'
import { env } from '@/env'

export default defineConfig({
	out: './src/drizzle', 
	schema: './src/db/schema/',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL,
	},
})