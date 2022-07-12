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
        value: {
            type: String,
            required: true
        },
        coin: {
            type: String,
            default: 'USD'
        }
    },
    expense: [{
        type: {
            type: String
        },
        description: {
            type: String
        },
        value: {
            type: String
        }
    }],
    totalCost: {
        value: {
            type: String,
            required: true
        },
        coin: {
            type: String,
            default: 'USD'
        }
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

export interface ExpenseInterface {
    type: string
    description: string
    value: string
}
export interface CoinsInterface {
    value: string
    coin: string
}
export interface IInfo extends Document {
    _id: string;
    user: string;
    country: string;
    currentBudget: CoinsInterface;
    expense: ExpenseInterface[];
    totalCost: CoinsInterface;
    travelDate: string;
    updatedAt: Date;
}

const InfoModel: Model<IInfo> = model('infos', infoSchema);
export default InfoModel;