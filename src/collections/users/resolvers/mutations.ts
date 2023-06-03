import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { UserCreated, UserInput } from './interfaces';

export const Mutations = {
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
            if (error.code == 121) {
                throw new GraphQLError(
                    `DatabaseError: Document failed validation,
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
            return error;
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
            if (result.lastErrorObject.updatedExisting == true) {
                return result.lastErrorObject.updatedExisting;
            } else {
                throw new GraphQLError(result.lastErrorObject.updatedExisting);
            }
        } catch (error: any) {
            if (error.codeName == 'DocumentValidationFailure') {
                throw new GraphQLError(
                    `DatabaseError: Document failed validation
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
            return error;
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
};
