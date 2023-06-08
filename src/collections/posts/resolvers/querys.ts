import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { Post } from './interfaces';
import { err400, err401 } from '../../../helpers/statusCodes';

export const Querys = {
    Query: {
        // GET POST
        async post(
            _: any,
            { id }: { id: string },
            context: any
        ): Promise<Post> {
            try {
                // Check if the user is authenticated
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to Get this post',
                        err401
                    );
                }
                const result = await context.postsCollection.findOne({
                    _id: new ObjectId(id)
                });
                return result;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, err400);
            }
        },
        // GET POSTS
        async getPosts(_: any, __: any, context: any): Promise<Post[]> {
            try {
                // Check if the user is authenticated
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to Get all the posts',
                        err401
                    );
                }
                const result = await context.postsCollection.find().toArray();
                return result;
            } catch (error: any) {
                throw new GraphQLError(`${error}`, err400);
            }
        }
    }
};
