import { Request, Response } from "express";
import mongoose from "mongoose";

import { clientSchemaValidator } from "../utilities/validator";
import clientModel from "../models/clientModel";

const createClient = async (req: Request, res: Response) : Promise<Response> => {
    const { name, email, dateOfBirth, address } = req.body;

    // convert dob to an actual date
    const parsedDOB = new Date(dateOfBirth);
    
    try {

        // check if user already exists
        const existingClient = await clientModel.findOne({ email });
        
        if (existingClient) {
            return res.status(400).json({ Message: "A user with that email already exists" });
        };

        // validate client data
        await clientSchemaValidator.validateAsync({
            name,
            email,
            dateOfBirth: parsedDOB, // Use the parsed date
            address
        });
        
        // if validation passes, create a new client
        const newClient = new clientModel({
            clientId: new mongoose.Types.ObjectId(),
            name,
            email,
            dateOfBirth : parsedDOB,
            address
        });
        
        const savedClient = await newClient.save();
        

        return res.status(201).json({
            status: 201,
            message: "Client created successfully.",
            Client : savedClient
        });
        

    } catch (error) {
        // handle validation error
        if (error.isJoi) {
            return res.status(400).json({ error: error.message });
        }

        // handle general server error
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// const getClientByEmail = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const { id: _id } = req.params;
//         console.log(_id);

//         if (!mongoose.Types.ObjectId.isValid(_id)) {
//             return res.status(500).json({Error : `${_id} is not a valid id.`})
//         }

//         const client = await clientModel.findById(_id);
//         console.log(client);
        
//         return res.status(200).json({ client: client });
        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ Error: "Internal server error." });
//     }
// };

export default createClient;