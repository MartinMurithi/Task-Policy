import mongoose, { Document, Schema } from "mongoose";

import { claimStatusEnum } from "../data/data";

export interface IClaim extends Document { 
    claimId: mongoose.Types.ObjectId,
    policyId: mongoose.Types.ObjectId,
    clientId: mongoose.Types.ObjectId,
    claimDate: Date,
    claimAmount: number,
    status: claimStatusEnum,
    description : string
};

const claimSchema: Schema = new Schema({
    claimId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        unique : true
    },
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'policy'
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'client'
    },
    claimDate: {
        type: Date,
        required: true
    },
    claimAmount: {
        type: Number,
        required : true
    },
    status: {
        type: String,
        required: true,
        enum : Object.values(claimStatusEnum)
    },
    description: {
        type: String,
        required : true
    }

}, { timestamps: true });

const claimModel = mongoose.model<IClaim>("claim", claimSchema);
export default claimModel;