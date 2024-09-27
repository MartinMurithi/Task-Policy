import mongoose, { Document, Schema } from "mongoose";

import {claimStatusEnum} from "../data/data";

export interface IprocessedClaimsModel extends Document {
    processedClaimId : mongoose.Types.ObjectId,
    submitClaimId: mongoose.Types.ObjectId; // Reference to the submitted claim
    policyId: mongoose.Types.ObjectId; // Reference to the policy
    disbursementAmount: number; // Amount disbursed if the claim is approved
    status: string; // Status of the processed claim
    processedAt: Date; // Timestamp for when the claim was processed
}

const processedClaimsSchema: Schema = new Schema({
    processedClaimId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
     submitClaimId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'submitClaim' // Reference to the submitted claim
    },
    policyId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'policy' // Reference to the Policy model
    },
    disbursementAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(claimStatusEnum),
    },
    processedAt: {
        type: Date,
        default: Date.now // Sets to current date by default
    }
}, { timestamps: true }
);

const processedClaimsModel = mongoose.model<IprocessedClaimsModel>("processedClaims", processedClaimsSchema);

export default processedClaimsModel;