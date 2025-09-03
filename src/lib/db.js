"use server";

import { MongoClient, ServerApiVersion } from "mongodb";

//check if Db uri exists
const dbUri = process.env.DB_URI;
if (!dbUri) {
  console.log("DB_URI does not exist");
}

//create new MongoClient
const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//connect to the database
async function getDb(dbName) {
  try {
    await client.connect();
    console.log("Connected to Database Successfully");
    return client.db(dbName);
  } catch (error) {
    console.log("Error connecting to Database:");
  }
}

//function to get collections
export async function getCollection(collectionName) {
  const db = await getDb("blogsite");
  if (db) {
    return db.collection(collectionName);
  }
}
