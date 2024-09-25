import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DB_URI = process.env.CONN_STRING as string;

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected successfully.");
        
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default connect;