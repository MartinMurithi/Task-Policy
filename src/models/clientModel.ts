import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
    clientId: mongoose.Types.ObjectId,
    name: string,
    email: string,
    dateOfBirth: Date,
    address : string
};

const clientSchema: Schema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique : true
    },
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required : true
    }
}, {timestamps : true});

const clientModel = mongoose.model<IClient>("client", clientSchema);
export default clientModel;