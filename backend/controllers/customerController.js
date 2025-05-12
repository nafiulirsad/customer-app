const { getClient } = require('../config/db');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'customer-app';
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'customers';

let _dbInstance = null;

// Lazily get the database instance using existing client
async function getDb() {
  if (!_dbInstance) {
    const client = await getClient();
    if (!client) {
      throw new Error('MongoDB client not initialized. Call connectDB first.');
    }
    _dbInstance = client.db(DB_NAME);
  }
  return _dbInstance;
}

// Get collection instance
async function getCollection() {
  const db = await getDb();
  return db.collection(COLLECTION_NAME);
}

// Ambil data dengan pagination
exports.getCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  try {
    const collection = await getCollection();

    const customers = await collection
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Gender Stats
exports.getGenderStats = async (req, res) => {
  try {
    const collection = await getCollection();

    const pipeline = [
      { $match: { gender: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: "$gender", count: { $sum: 1 } } }
    ];

    const stats = await collection.aggregate(pipeline).toArray();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Location Type Stats
exports.getLocationTypeStats = async (req, res) => {
  try {
    const collection = await getCollection();

    const pipeline = [
      { $match: { locationType: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: "$locationType", count: { $sum: 1 } } }
    ];

    const stats = await collection.aggregate(pipeline).toArray();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Digital Interest Stats
exports.getDigitalInterestStats = async (req, res) => {
  try {
    const collection = await getCollection();

    const pipeline = [
      { $match: { digitalInterest: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: "$digitalInterest", count: { $sum: 1 } } }
    ];

    const stats = await collection.aggregate(pipeline).toArray();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Device Brand Stats
exports.getDeviceBrandStats = async (req, res) => {
  try {
    const collection = await getCollection();

    const pipeline = [
      { $match: { brandDevice: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: "$brandDevice", count: { $sum: 1 } } }
    ];

    const stats = await collection.aggregate(pipeline).toArray();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Age Distribution
exports.getAgeDistribution = async (req, res) => {
  try {
    const collection = await getCollection();

    const currentYear = new Date().getFullYear();
    const boundaries = [1950, 1960, 1970, 1980, 1990, 2000, 2010];

    const pipeline = [
      {
        $match: {
          age: {
            $exists: true,
            $ne: null,
            $gte: 1900,
            $lte: currentYear
          }
        }
      },
      {
        $bucket: {
          groupBy: "$age",
          boundaries: boundaries,
          default: "other",
          output: {
            count: { $sum: 1 }
          }
        }
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();

    const labels = result.map(r => {
      const next = boundaries.indexOf(r._id) < boundaries.length - 1
        ? boundaries[boundaries.indexOf(r._id) + 1]
        : currentYear;
      return `${r._id}-${next}`;
    });

    const counts = result.map(r => r.count);

    res.json({ labels, counts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
