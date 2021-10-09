import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

// connect to db
export const connectDatabase = async () => {
  mongod = await MongoMemoryServer.create();
};

// disconnect database
export const closeDatabase = async () => {
  await mongoose.connection.close();
  await mongod.stop();
};

// clear database

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
