import { Request, Response } from "express";
import mongoose from "mongoose";

import { clientSchemaValidator } from "../utils/validator";
import clientModel from "../models/clientModel";

const createClient = async (req: Request, res: Response) : Promise<Response> => {
    const { name, email, dateOfBirth, address } = req.body;

    const parsedDOB = new Date(dateOfBirth);
    
    try {
        const existingClient = await clientModel.findOne({ email });
        
        if (existingClient) {
            return res.status(400).json({ Message: "A user with that email already exists" });
        };

        await clientSchemaValidator.validateAsync({
            name,
            email,
            dateOfBirth: parsedDOB,
            address
        });
        
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
        if (error.isJoi) {
            return res.status(400).json({ error: error.message });
        }

        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


const getClients = async (req: Request, res: Response): Promise<Response> => {
    try {
        const clients = await clientModel.find(); // Fetch all clients
        return res.status(200).json({clients : clients});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export {createClient, getClients};