import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Initialize database connection
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to PostgreSQL database');
    
    // Sync all models with database
    await sequelize.sync({ alter: false });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
};

// Database query helper with error handling
const query = async (text, params) => {
  try {
    const start = Date.now();
    const result = await sequelize.query(text, {
      replacements: params,
      type: sequelize.QueryTypes.SELECT
    });
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.length });
    return result;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
};

export { query, sequelize, initializeDatabase };
