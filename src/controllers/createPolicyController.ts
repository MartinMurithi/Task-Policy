import mongoose from "mongoose";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import policyModel from "../models/policyModel";
import { policySchemaValidator } from "../utils/validator";


const createPolicy = async (req: Request, res: Response): Promise<Response> => {
    
    const {
        clientId,
        policyType,
        startDate,
        endDate,
        premiumAmount,
        coverageAmount
    } = req.body;
    console.log(req.body);
    
    try {
        // validate policy schema
        await policySchemaValidator.validateAsync(req.body);

        // create new policy
        const newPolicy = new policyModel({
            policyId: new mongoose.Types.ObjectId(),
            clientId,
            policyNumber : uuidv4(),
            policyType,
            startDate,
            endDate,
            premiumAmount,
            coverageAmount
        });        

        const savedPolicy = await newPolicy.save();

        return res.status(201).json({
            status: 201,
            message: "New policy created successfully.",
            policy : savedPolicy
        });

    } catch (error) {
        console.error(error);

        // Check if error is a Joi validation error
        if (error.isJoi) {
            return res.status(400).json({ error: error.message }); 
        }

        return res.status(500).json({ Message: "Internal server error" });
        
    }
};

export default createPolicy;