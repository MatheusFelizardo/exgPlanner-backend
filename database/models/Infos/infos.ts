import { Schema, model, Model, Document } from 'mongoose';

const infoSchema: Schema = new Schema<IInfo>({
    user: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    currentBudget: {
        type: String,
        required: true,
    },
    expense: [{
        type: String,
        required: true,
    }],
    totalCost: {
        type: String,
        required: true,
    },
    travelDate: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export interface IInfo extends Document {
    _id: string;
    user: string;
    country: string;
    currentBudget: string;
    expense: string[];
    totalCost: string;
    travelDate: string;
    updatedAt: Date;
}

const InfoModel: Model<IInfo> = model('infos', infoSchema);
export default InfoModel;