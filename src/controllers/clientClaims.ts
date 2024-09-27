import { Request, Response } from 'express';
import mongoose from 'mongoose';
import processedClaimsModel from '../models/processedClaimsModel'; 

export const retrieveClientClaims = async (req: Request, res: Response): Promise<Response> => {
    const clientId = '66f583ead1439e8918904755';

    try {
        const claims = await processedClaimsModel.aggregate([
            {
                $match: { clientId: new mongoose.Types.ObjectId(clientId) } // Match claims by clientId
            },
            {
                $group: {
                    _id: '$status', // Group claims by status
                    claims: { $push: '$$ROOT' } // Push all claim documents into an array
                }
            }
        ]);

        return res.status(200).json(claims);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default retrieveClientClaims;