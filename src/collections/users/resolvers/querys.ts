import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { User } from './interfaces';

export const Querys = {
    // GET USER
    Query: {
        async user(
            _: any,
            { id }: { id: string },
            context: any
        ): Promise<User> {
            try {
                const result = await context.usersCollection.findOne({
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

        async getUsers(_: any, __: any, context: any): Promise<User[]> {
            try {
                const result = await context.usersCollection.find().toArray();
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
