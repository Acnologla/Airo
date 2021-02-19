const fs = require("fs")
const createDatabaseScript = fs.readFileSync(`${__dirname}/models/database.sql`, "utf-8")
const client = require("./client.js")

client.query(createDatabaseScript)
    .then(() => console.log(`Database Created`))
    .catch(error => {
        console.error(error)
        console.error("Failed to create database")
    })

client.end()