const { connect } = require("mongoose");
const axios = require('axios');
const Product = require('../models/product.model')
require("colors");

async function initializeDatabase() {
    try {
      // Check if there is existing data in the database
      const existingData = await Product.find();
  
      if (existingData.length === 0) {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const seedData = response.data;
  
        // Insert seed data into the database
        await Product.insertMany(seedData);
  
        console.log('Database initialized with seed data.');
      } else {
        console.log('Database already contains data. Skipping initialization.');
      }
    } catch (error) {
      console.error('Error initializing database:', error.message);
    }
  }

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 45000,
  family: 4,
  serverSelectionTimeoutMS: 30000,
  heartbeatFrequencyMS: 30000,
  autoIndex: true,
};

(async () => {
  try {
    const {
      connection: { host, port },
    } = await connect(process.env.MONGODB_URI, options);
    initializeDatabase();

    console.log(
      `MongoDB server ${host}:${port} connected...`.cyan.underline.bold
    );
  } catch ({ message }) {
    console.log(process.env.MONGODB_URI);
    console.error(`MongoDB server unable to connect...`.red.underline.bold);
    console.error(`${message}`.red.underline.bold);
  }
})();
