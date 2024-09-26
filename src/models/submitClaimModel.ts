import mongoose, { Document, Schema } from "mongoose";

import { statusEnum } from "../data/data";

export interface ISubmitClaim extends Document {
    claimId: mongoose.Types.ObjectId,
    policyId: mongoose.Types.ObjectId,
    clientId: mongoose.Types.ObjectId,
    policyNumber : string,
    claimAmount: number,
    status: statusEnum,
    description: string
};

const submitClaimSchema: Schema = new Schema({
    claimId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    policyId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref : 'policy'
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref : 'client'
    },
    policyNumber: {
      type: String,
      required : true  
    },
    claimAmount: {
        type: Number,
        required : true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(statusEnum),
        default : statusEnum.submitted
    },
    description: {
        type: String,
        required : true
    }
}, {
    timestamps : true
});

const submitClaimModel = mongoose.model<ISubmitClaim>("submitClaim", submitClaimSchema);
export default submitClaimModel;