import { config } from 'dotenv'
import { z } from 'zod'

config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables:')
  console.error(JSON.stringify(_env.error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

export const env = _env.data