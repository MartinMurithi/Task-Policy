import { Request, Response } from 'express';
import submitClaimsModel from '../models/submitClaimModel';

const fetchSubmittedClaims = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const submittedClaims = await submitClaimsModel.find();

        return res.status(200).json(submittedClaims);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default fetchSubmittedClaims;