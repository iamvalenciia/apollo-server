import userResolvers from '../collections/users/resolvers/main';

export default {
    Query: userResolvers.Querys,
    Mutation: userResolvers.Mutations
};
