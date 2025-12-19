require("dotenv").config();
const { MONGO_PASSWORD } = process.env;
const { MongoClient } = require("mongodb");
const { default: bookArray } = require("./books");

const uri = `mongodb+srv://thetomgrant_db_user:${MONGO_PASSWORD}@cluster0.u4ducmb.mongodb.net/`;
const client = new MongoClient(uri);

async function main() {
    const database = client.db("Library");
    const books = await database.createCollection("libCollection");
    await books.insertMany(bookArray)
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

