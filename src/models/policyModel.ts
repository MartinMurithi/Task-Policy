import mongoose, { Document, Schema } from "mongoose";

enum policyTypeEnum {
    Life = 'LIFE',
    Health = 'HEALTH',
    Auto = 'AUTO',
    Home = "HOME"
};

enum statusEnum { 
    Active = "ACTIVE",
    Expired = "EXPIRED",
    Cancelled = "CANCELLED"
}

export interface IPolicy extends Document {
    policyId: string,
    clientId: mongoose.Types.ObjectId,
    policyNumber: string,
    policyType: policyTypeEnum,
    startDate: Date,
    endDate: Date,
    premiumAmount: number,
    coverageAmount: number,
    status : statusEnum
};

// Policy schema

const policySchema: Schema = new Schema({
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique : true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
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
        enum : Object.values(statusEnum)
    }
}, { timestamps: true });

const policyModel = mongoose.model<IPolicy>("policy", policySchema);
export default policyModel;