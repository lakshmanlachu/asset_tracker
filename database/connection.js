import { Sequelize } from 'sequelize';
import CONFIG from '../config/config.js';

// Initialize Sequelize with database connection details
const sequelize = new Sequelize(CONFIG.DB_URL, {
  dialect: 'postgres',
  logging: false, 
});

// database connection
async function DatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize, DatabaseConnection };