import { Pool } from "pg"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
})

export async function query(text: string, params?: any[]) {
    // const start = Date.now()
    console.log("pool", pool)
    const res = await pool.query(text, params)
    // const duration = Date.now() - start

    return res
}

export default {
  query
};