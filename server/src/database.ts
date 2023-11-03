import { Pool } from "pg";

const pool = new Pool({
    user: "test",
    password: "testPass1",
    port: 5432,
    database: "file_tracker"
})

export default pool;