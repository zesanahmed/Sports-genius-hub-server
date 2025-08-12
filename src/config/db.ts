import { MongoClient, ServerApiVersion, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwwrf4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let db: Db;

export const connectDB = async () => {
  if (!db) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    db = client.db("sportsDB");
    console.log("✅ Connected to MongoDB");
  }
  return db;
};
