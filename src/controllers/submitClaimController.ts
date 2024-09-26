import { Request, Response } from "express";
import mongoose from "mongoose";

import policyModel from "../models/policyModel";
import { submitClaimSchemaValidator } from "../utils/validator";
import submitClaimModel from "../models/submitClaimModel";


const submitClaim = async (req: Request, res: Response): Promise<Response> => {
    const { policyNumber, claimAmount, description } = req.body;
    
    try {
        
        // validate the submit claim data
        await submitClaimSchemaValidator.validateAsync(req.body);

        // check if policy exists
        const existingPolicy = await policyModel.findOne({ policyNumber });
        console.log(`Existing policy : ${existingPolicy}`);
        

        if (!existingPolicy) {
            return res.status(404).json({ Message: "Policy does not exist" });
        }

        // ensure the claim amount does not exceed the coverage amount
        if (claimAmount > existingPolicy.coverageAmount) {
            return res.status(400).json({Message : "Claim amount exceeds the policy's coverage amount"});
        }

        // create new claim
        const newClaim = new submitClaimModel({
            claimId: new mongoose.Types.ObjectId(),
            policyId : existingPolicy.policyId,
            clientId : existingPolicy.clientId,
            policyNumber : existingPolicy.policyNumber,
            claimAmount,
            description
        });

        const savedClaim = await newClaim.save();

        console.log(`Saved claim ${savedClaim}`);
        
        return res.status(201).json({
            Message: "Claim submitted succesfully",
            claim : savedClaim
        })

    } catch (error) {
        console.error(error);

         if (error.isJoi) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ Message: "Internal server error" });
        
    }

};

export default submitClaim;