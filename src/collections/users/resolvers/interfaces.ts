import { ObjectId } from 'mongodb';

export interface User {
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    gender?: string;
    followersCount?: number;
    followingCount?: number;
}

export interface UserCreated {
    acknowledged: boolean;
    insertedId: ObjectId | string;
    message: string;
}

export interface UserInput {
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    gender?: string;
    followersCount?: number;
    followingCount?: number;
}
