import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { User } from './interfaces';
import { err400, err401 } from '../../../helpers/statusCodes';

export const Querys = {
    // GET USER
    Query: {
        async user(
            _: any,
            { id }: { id: string },
            context: any
        ): Promise<User> {
            try {
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to Get this user information',
                        err401
                    );
                }
                const result = await context.usersCollection.findOne({
                    _id: new ObjectId(id)
                });
                return result;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, err400);
            }
        },

        async getUsers(_: any, __: any, context: any): Promise<User[]> {
            try {
                if (!context.user) {
                    throw new GraphQLError(
                        'User is not authenticated to access all user information',
                        err401
                    );
                }
                const result = await context.usersCollection.find().toArray();
                return result;
            } catch (error: any) {
                throw new GraphQLError(`${error}`, err400);
            }
        }
    }
};
