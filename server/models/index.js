const { Client } = require('pg');
const config = require('../config/db_pg.json');

const dbConfig = config[process.env.NODE_ENV || 'development'];
const client = new Client(dbConfig);

const db = {
    client,
    // User
}

client.connect();

