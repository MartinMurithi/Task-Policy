import mongoose, { Document, Schema } from "mongoose";

import { policyTypeEnum, policyStatusEnum } from "../data/data";

export interface IPolicy extends Document {
    policyId: mongoose.Types.ObjectId,
    clientId: mongoose.Types.ObjectId,
    policyNumber: string,
    policyType: policyTypeEnum,
    startDate: Date,
    endDate: Date,
    premiumAmount: number,
    coverageAmount: number,
    status : policyStatusEnum
};

const policySchema: Schema = new Schema({
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique : true
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref : 'client' //Reference the client model
    },
    policyNumber: {
        type: String,
        required: true,
        unique : true
    },
    policyType: {
        type: String,
        required: true,
        enum : Object.values(policyTypeEnum)
    },
    startDate: {
        type: Date,
        required : true
    },
    endDate: {
        type: Date,
        required: true
    },
    premiumAmount: {
        type: Number,
        required : true
    },
    coverageAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(policyStatusEnum),
        default : policyStatusEnum.active
    }
}, { timestamps: true });

const policyModel = mongoose.model<IPolicy>("policy", policySchema);
export default policyModel;