import UserModel from './users';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {json_secret } from '../../../envs'

export const getAllUsers = async (limit: number) => {
    return await UserModel.find({}).limit(limit);
}

export const getUserById = async (id: string) => {
    return await UserModel.findById(id);
}

export const getUserByToken = async ({token}: {token:string}) => {
    return await UserModel.findOne({token})
}

export const createUser = async ({  name, email, password }: { name: string, email: string, password: string }) => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)

    const user = await UserModel.findOne({email})

    if (user) {
       throw new Error("User already exists!!") 
    }

    return await UserModel.create({  name, email, password });
}

export const userLogin = async ({  email, password }: { email: string, password: string }) => {

    const user = await UserModel.findOne({email})

    if(!user) {
        throw new Error("User not found!")
    }

    const decryptedPassword = await bcrypt.compare(password, user.password)

    if (!decryptedPassword) {
        throw new Error("Invalid password!")
    }   

    const token = jwt.sign({
        user: user.id,
        date:  Date.now()
    }, json_secret as string)

    const response = {
        name: user.name,
        email: user.email,
        token
    }

    await UserModel.findOneAndUpdate({email: user.email}, {token: token});

    return response
}

export const updateUser = async (id: string, {  name, email, password, updatedAt }: { name: string, email: string, password: string, updatedAt: number }) => {
    const update: { name?: string, email?: string, password?: string, updatedAt?: number } = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        update.password = password;
    }
    update.updatedAt = updatedAt
    
    return await UserModel.findByIdAndUpdate(id, update);
}

export const deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
}