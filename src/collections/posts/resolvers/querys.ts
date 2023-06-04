import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { Post } from './interfaces';

export const Querys = {
    Query: {
        // GET POST
        async post(
            _: any,
            { id }: { id: string },
            context: any
        ): Promise<Post> {
            try {
                const result = await context.postsCollection.findOne({
                    _id: new ObjectId(id)
                });
                return result;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, {
                    extensions: {
                        http: {
                            status: 400
                        }
                    }
                });
            }
        },
        // GET POSTS
        async getPosts(_: any, __: any, context: any): Promise<Post[]> {
            try {
                const result = await context.postsCollection.find().toArray();
                return result;
            } catch (error: any) {
                throw new GraphQLError(`${error}`, {
                    extensions: {
                        http: {
                            status: 400
                        }
                    }
                });
            }
        }
    }
};
