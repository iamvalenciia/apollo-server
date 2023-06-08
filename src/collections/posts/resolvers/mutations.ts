import { ObjectId } from 'mongodb';
import { GraphQLError, isCompositeType } from 'graphql';
import { Post, PostInput, Participant } from './interfaces';
import { SuccessfullyCreated } from './interfaces';
import { result } from 'lodash';
import { err400, err401 } from '../../../helpers/statusCodes';

export const Mutations = {
    Mutation: {
        // CREATE POST
        async createPost(
            _: any,
            { postInput }: { postInput: PostInput },
            context: any
        ): Promise<SuccessfullyCreated> {
            const {
                OwnerId,
                createdAt,
                content,
                likes,
                Participants,
                postStatus
            } = postInput;
            const newPost: PostInput = {
                OwnerId: new ObjectId(OwnerId),
                createdAt: new Date(createdAt),
                content,
                likes,
                Participants: Participants.map((participant: Participant) => ({
                    id_user: new ObjectId(participant.id_user),
                    status: participant.status
                })),
                postStatus
            };
            try {
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to create a post',
                        err401
                    );
                }
                const result = await context.postsCollection.insertOne(newPost);
                if (result.acknowledged == true) {
                    return {
                        acknowledged: result.acknowledged,
                        insertedId: result.insertedId,
                        message: 'Post created successfully'
                    };
                }
            } catch (error: any) {
                throw new GraphQLError(
                    `DatabaseError: Document failed validation
                propertiesNotSatisfied: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName},
                description: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description}`,
                    err400
                );
            }
        },
        // DELETE POST
        async deletePost(
            _: any,
            { id }: { id: string },
            context: any
        ): Promise<boolean> {
            try {
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to delete this post',
                        err401
                    );
                }
                const result = await context.postsCollection.deleteOne({
                    _id: new ObjectId(id)
                });
                return result.deletedCount === 1;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, err400);
            }
        },
        // UPDATE POST
        async updatePost(
            _: any,
            { id, postInput }: { id: string; postInput: PostInput },
            context: any
        ): Promise<Post> {
            const {
                OwnerId,
                createdAt,
                content,
                likes,
                Participants,
                postStatus
            } = postInput;
            const updatedPost: PostInput = {
                OwnerId: new ObjectId(OwnerId),
                createdAt: new Date(createdAt),
                content,
                likes,
                Participants: Participants.map((participant: Participant) => ({
                    id_user: new ObjectId(participant.id_user),
                    status: participant.status
                })),
                postStatus
            };
            try {
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to update this post',
                        err401
                    );
                }
                await context.postsCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedPost }
                );
                const updatedPostData = await context.postsCollection.findOne({
                    _id: new ObjectId(id)
                });
                return updatedPostData;
            } catch (error: any) {
                throw new GraphQLError(
                    `DatabaseError: Document failed validation
                propertiesNotSatisfied: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName},
                description: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description}`,
                    err400
                );
            }
        },
        // UPDATE PARTICIPANT STATUS
        async updateParticipantStatus(
            _: any,
            {
                postId,
                participantId,
                status
            }: { postId: string; participantId: string; status: string },
            context: any
        ): Promise<Post> {
            try {
                await context.postsCollection.updateOne(
                    {
                        _id: new ObjectId(postId),
                        'Participants.id_user': new ObjectId(participantId)
                    },
                    {
                        $set: { 'Participants.$.status': status }
                    }
                );
                const updatedPostData = await context.postsCollection.findOne({
                    _id: new ObjectId(postId)
                });
                return updatedPostData;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, err400);
            }
        }
    }
};
