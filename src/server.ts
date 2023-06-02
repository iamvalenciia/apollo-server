/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient } from 'mongodb';
import { typeDefs } from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { formatError } from './graphql/formatError';
dotenv.config();

const PORT = Number.parseInt(process.env.PORT) || 8000;
interface MyContext {
    token?: String;
}

const startServer = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();
        console.log('MongoDB connection successful');

        const db = client.db(); // Access the MongoDB database
        const server = new ApolloServer<MyContext>({
            typeDefs,
            resolvers,
            formatError
        });

        const { url } = await startStandaloneServer(server, {
            context: async ({ req }) => ({
                token: req.headers.token,
                usersCollection: db.collection('users'),
                postsCollection: db.collection('posts')
            }),
            listen: { port: PORT }
        });
        console.log(`Server started at ${url}`);
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
