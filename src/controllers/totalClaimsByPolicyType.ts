import { Request, Response } from "express";
import submitClaimModel from "../models/submitClaimModel";

const getTotalClaimsByPolicyType = async (req: Request, res: Response): Promise<Response> => {
    try {
        const totalClaimsByPolicyType = await submitClaimModel.aggregate([
            {
                $group: {
                    _id: "$policyType", 
                    totalClaims: { $sum: 1 }, 
                    totalClaimAmount: { $sum: "$claimAmount" } 
                }
            },
            {
                $project: {
                    _id: 0,
                    policyType: "$_id",
                    totalClaims: 1,
                    totalClaimAmount: 1
                }
            }
        ]);

        return res.status(200).json({
            Message: "Total claims by policy type retrieved successfully",
            totalClaimsByPolicyType
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Message: "Internal server error" });
    }
};

export default getTotalClaimsByPolicyType;
