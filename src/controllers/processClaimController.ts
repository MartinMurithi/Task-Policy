import { Request, Response } from "express";
import mongoose from "mongoose";

import submitClaimModel from "../models/submitClaimModel";
import processedClaimsModel from "../models/processedClaimsModel";
import { claimStatusEnum } from "../data/data";

const processClaim = async (req: Request, res: Response): Promise<Response> => {
    //copy this id from the list of submitted claims fetched in post. Copy the _id
    const claimId = "66f698b06c2280668cf91b97";

    // Destructure and type currentStatus from req.body
const { status, disbursementAmount }: { status: 'approved' | 'rejected', disbursementAmount: number } = req.body;    
    try {
        const policyClaim = await submitClaimModel.findOne({ _id: claimId }).populate({
            path: "policyId",
            select : "coverageAmount"
        });

        if (!policyClaim) {
            return res.status(404).json({ Message: "Policy claim does not exist" });
        }

        if (policyClaim.status !== claimStatusEnum.submitted) {
            return res.status(400).json({ Message: "Claim is not in 'submitted' status" });
        }

         let disbursement: number = 0; // Change to let to allow reassignment

       if (status === 'approved') {
            policyClaim.status = claimStatusEnum.approved;

            // Get the coverage amount from the associated policy
            const coverageAmount = (policyClaim.policyId as any).coverageAmount;

            // If the provided disbursement amount exceeds the coverage amount, adjust it
            disbursement = Math.min(disbursementAmount, coverageAmount);
        } else if (status === 'rejected') {
            policyClaim.status = claimStatusEnum.rejected;
        } else {
            return res.status(400).json({ Message: "Invalid status" });
        }

        await policyClaim.save();

        // Save to processClaim model
        const processedClaim = new processedClaimsModel({
            processedClaimId : new mongoose.Types.ObjectId(),
            submitClaimId: policyClaim._id,
            policyId: policyClaim.policyId,
            disbursementAmount: status === 'approved' ? disbursement : 0, // Set to 0 if rejected
            status: policyClaim.status
        });

        await processedClaim.save();

        return res.status(200).json({
            Message: "Claim processed successfully",
            submittedClaim : policyClaim,
            processedClaim: processedClaim,
            disbursement: status === 'approved' ? disbursement : null
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Message: "Internal server error" });
    }
};

export default processClaim;
