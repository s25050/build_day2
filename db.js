import pg from 'pg'

// DB와의 연결 통로 - pool
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})

export default pool; 