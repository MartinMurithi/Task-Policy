import { Request, Response } from "express";
import policyModel from "../models/policyModel"

const getPolicies = async (req: Request, res: Response): Promise<Response> => {
    try {
        const policies = await policyModel.find(); // Fetch all clients
        return res.status(200).json({Policies: policies});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default getPolicies;