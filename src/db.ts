import { Pool } from 'pg';

const connectionString  = 'postgres://gmzxbmef:pR6SKqK1xhr9uEB6QQtNJ0MStbDmd8dH@motty.db.elephantsql.com/gmzxbmef';

const db = new Pool({
    connectionString,
});

export default db;