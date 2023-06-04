import { ObjectId } from 'mongodb';

export interface Post {
    _id: ObjectId | string;
    OwnerId: ObjectId | string;
    createdAt: string;
    content: string;
    likes: number;
    Participants: Participant[];
    postStatus: string;
}

export interface Participant {
    id_user: ObjectId | string;
    status: string;
}

export interface PostInput {
    OwnerId: ObjectId;
    createdAt: Date;
    content: string;
    likes: number;
    Participants: Participant[];
    postStatus: string;
}

export interface SuccessfullyCreated {
    acknowledged: boolean;
    insertedId: ObjectId | string;
    message: string;
}
