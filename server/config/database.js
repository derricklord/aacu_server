module.exports = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 28015,
    authKey: process.env.AUTH_KEY || '',
    db: process.env.DB_NAME || 'db_ucheer'
}