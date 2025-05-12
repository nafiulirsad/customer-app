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
    if (!connectedClient || !isConnected(connectedClient)) {
      if (connectedClient) {
        console.log('⚠️ Existing connection is stale. Reconnecting...');
      }

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

// Helper function to check if client is connected
const isConnected = (clientInstance) => {
  return clientInstance && clientInstance.topology && clientInstance.topology.isConnected();
};

// getClient now ensures connection is valid
const getClient = async () => {
  if (!connectedClient || !isConnected(connectedClient)) {
    await connectDB(); // auto-reconnect
  }
  return connectedClient;
};

module.exports = { connectDB, getClient };
