import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import clientModel from "../models/clientModel";
import policyModel from "../models/policyModel";
import submitClaimModel from "../models/submitClaimModel";
import processedClaimsModel from "../models/processedClaimsModel";


const seedDatabase = async () => {
    const DB_URI = process.env.CONN_STRING as string;
    

    await mongoose.connect(DB_URI);

     // Clear existing data
    await clientModel.deleteMany({});
    await policyModel.deleteMany({});
    await submitClaimModel.deleteMany({});
};