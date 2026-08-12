import { MongoClient } from "mongodb";

const url="mongodb://localhost:27017";
const dbName="node-project";
const client= new MongoClient(url)
export const collectionName="ToDo";

export const connection=async()=>{
    const connect= await client.connect();
    return connect.db(dbName)
}