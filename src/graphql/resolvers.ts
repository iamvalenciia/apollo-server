import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { error } from 'console';
import { ApolloServerErrorCode } from '@apollo/server/errors';

interface User {
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    gender?: string;
    followersCount?: number;
    followingCount?: number;
}

interface UserCreated {
    acknowledged: Boolean;
    insertedId: ObjectId | String;
    message: String;
}

interface UserInput {
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    gender?: string;
    followersCount?: number;
    followingCount?: number;
}

export default {
    Query: {
        // GER USER
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
        // GER USERS
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
    },
    Mutation: {
        // CREATE USER
        async createUser(
            _: any,
            { userInput }: { userInput: UserInput },
            context: any
        ): Promise<UserCreated> {
            const {
                name,
                userName,
                email,
                password,
                gender,
                followersCount,
                followingCount
            } = userInput;
            const newUser: UserInput = {
                name,
                userName,
                email,
                password,
                gender,
                followersCount,
                followingCount
            };
            try {
                const result = await context.usersCollection.insertOne(newUser);
                if (result.acknowledged == true) {
                    return {
                        acknowledged: result.acknowledged,
                        insertedId: result.insertedId,
                        message: 'User created successfully'
                    };
                }
            } catch (error: any) {
                throw new GraphQLError(
                    `MongoServerError: Document failed validation,
                    propertiesNotSatisfied: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName},
                    description: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description}`,
                    {
                        extensions: {
                            http: {
                                status: 400
                            }
                        }
                    }
                );
            }
        },
        // EDIT USER
        async editUser(
            _: any,
            { id, userInput }: { id: string; userInput: UserInput },
            context: any
        ): Promise<boolean> {
            const {
                name,
                userName,
                email,
                password,
                gender,
                followersCount,
                followingCount
            } = userInput;
            const updatedUser: UserInput = {
                name,
                userName,
                email,
                password,
                gender,
                followersCount,
                followingCount
            };
            try {
                const result = await context.usersCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: updatedUser }
                );
                return result.lastErrorObject.n === 1;
            } catch (error: any) {
                console.log(error);
                throw new GraphQLError(
                    `MongoServerError: Document failed validation,
                    propertiesNotSatisfied: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName},
                    description: ${error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description}`,
                    {
                        extensions: {
                            http: {
                                status: 400
                            }
                        }
                    }
                );
            }
        },
        // DELETE USER
        async deleteUser(
            _: any,
            { id }: { id: string },
            context: any
        ): Promise<boolean> {
            try {
                const result = await context.usersCollection.deleteOne({
                    _id: new ObjectId(id)
                });
                return result.deletedCount === 1;
            } catch (error: any) {
                throw new GraphQLError(`${error.message}`, {
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
