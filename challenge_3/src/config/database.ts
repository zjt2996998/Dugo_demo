import mongoose, { ConnectionOptions } from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  MONGODB_PORT,
  MONGODB_HOST,
} = process.env;

const connectionString = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;


const connectDb = async (): Promise<void> => {
  const options: ConnectionOptions = {
    authSource: "admin",
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  };
  try {
    await mongoose.connect(connectionString, options);
    console.info("MongoDB connected!!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  };
};

export default connectDb;
