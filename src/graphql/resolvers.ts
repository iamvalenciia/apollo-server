import userResolvers from '../collections/users/resolvers/main';

export default {
    Query: userResolvers.userQuerys,
    Mutation: userResolvers.userMutations
};
