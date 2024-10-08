import mongoose from 'mongoose';
// import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// const pool = new Pool({
//   host: 'db',
//   port: 5432,
//   user: 'user123',
//   password: 'password123',
//   database: 'db123',
// });

// export default pool;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      // useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};