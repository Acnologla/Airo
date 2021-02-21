const path = require("path")
require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.local')
})
const fs = require("fs")
const createDatabaseScript = fs.readFileSync(`${__dirname}/database.sql`, "utf-8")
const { Client } = require('pg')
const client = new Client()
async function createDb() {
    try {
        await client.query(createDatabaseScript)
        console.log("Database created")
    } catch (err) {
        console.log(err)
        console.log(`Failed to create database\n${err}`)
    }
    client.end()
}
client.connect().then(createDb)