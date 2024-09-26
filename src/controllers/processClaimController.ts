import { Request, Response } from "express";
import submitClaimModel from "../models/submitClaimModel";
import { claimStatusEnum } from "../data/data";

const processClaim = async (req: Request, res: Response): Promise<Response> => {
    const _id = "66f56bac2b202c549f711005";

    // Destructure and type currentStatus from req.body
    const { currentStatus }: { currentStatus: 'submitted' | 'approved' | 'rejected' } = req.body;
    
    try {
        const policyClaim = await submitClaimModel.findById(_id).populate({
          path: "policy",
          select: ["coverageAmount"],
        });

        console.log(policyClaim);
        
        if (!policyClaim) {
            return res.status(404).json({ Message: "Policy claim does not exist" });
        }

        if (policyClaim.status !== claimStatusEnum.submitted) {
            return res.status(400).json({ Message: "Claim is not in 'submitted' status" });
        }

        let disbursement: number = 0;

        if (currentStatus === 'approved') {
            policyClaim.status = claimStatusEnum.approved;

            // Get the coverage amount from the associated policy
            const coverageAmount = (policyClaim.policyId as any).coverageAmount;

            // If the claim amount exceeds the coverage amount, disburse only the coverage amount
            disbursement = Math.min(policyClaim.claimAmount, coverageAmount);
        } else if (currentStatus === 'rejected') {
            policyClaim.status = claimStatusEnum.rejected;
        } else {
            return res.status(400).json({ Message: "Invalid status" });
        }

        await policyClaim.save();

        console.log(`Updated policy: ${policyClaim}`);

        return res.status(200).json({
            Message: "Claim processed successfully",
            claim: policyClaim,
            disbursement: currentStatus === 'approved' ? disbursement : null
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Message: "Internal server error" });
    }
};

export default processClaim;
