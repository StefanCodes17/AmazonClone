import * as Mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
const MONGODB_DB = process.env.DB_NAME || "";

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { 
    conn: null, 
    promise: null 
}}


export const connectToDatabase = async () => {
    // check if the database has already established a connection.
    if (cached.conn) {
        return cached.conn
    }

    // set the connection options
    const opts: Mongoose.ConnectOptions = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    };

    if(!cached.promise){
        // Connect to cluster
        Mongoose.set("strictQuery", false);
        cached.promise = await Mongoose.connect(MONGODB_URI, opts).then((mongoose)=> mongoose)
    }
    cached.conn = await cached.promise
    return cached.conn
}
