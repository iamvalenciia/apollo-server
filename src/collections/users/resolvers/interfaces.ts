import { ObjectId } from 'mongodb';

export interface User {
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    gender?: string;
    followersCount?: number;
    followingCount?: number;
    token?: string;
}

export interface SuccessfullyCreated {
    acknowledged: boolean;
    userId: ObjectId | string;
    message: string;
    token?: string;
}

export interface LoginUser {
    email?: string;
    password?: string;
}

export interface UserInput {
    _id?: ObjectId;
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    plainTextPassword?: string;
    encryptedPassword?: string;
    gender?: string;
    followersCount?: number;
    followingCount?: number;
    token?: string;
}
