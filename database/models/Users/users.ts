import { Schema, model, Model, Document } from 'mongoose';
// name, email, password
const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        nullable: true
    },
    email: {
        type: String,
        required: true,
        nullable: true
    },
    password: {
        type: String,
        required: true,
        nullable: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        nullable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        nullable: true
    },
    token: {
        type: String,
        nullable: true
    }
});

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    token: string;
}

const UserModel: Model<IUser> = model('users', userSchema);
export default UserModel;