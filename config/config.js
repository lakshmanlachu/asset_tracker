const CONFIG = {
    DB_URL: 'postgres://postgres:lachu@123@localhost:5432/postgres', // Example PostgreSQL connection URL
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET:'KT_TELE_TECH24'
  };
  
  export default CONFIG;