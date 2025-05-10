const { MongoClient } = require('mongodb');
require('dotenv').config();

let client;
let connectedClient = null;

const connectDB = async () => {
  try {
    // Initialize client only if not already initialized
    if (!client) {
      client = new MongoClient(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      });
    }

    // Avoid reconnecting if already connected
    if (!connectedClient) {
      await client.connect();
      // Ping to confirm connection
      await client.db("admin").command({ ping: 1 });
      console.log('✅ Connected to MongoDB');
      connectedClient = client;
    }

    return connectedClient;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Optional: export getClient for reuse in other modules
module.exports = { connectDB, getClient: () => connectedClient };