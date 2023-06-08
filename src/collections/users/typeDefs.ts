export const typeDefs = `#graphql
    """
    Represents a user.
    """
    type User {
        """
        The ID of the user.
        """
        _id: ID!
        """
        The name of the user.
        """
        name: String!
        """
        The username of the user.
        """
        userName: String!
        """
        The email address of the user.
        """
        email: String!
        """
        The password of the user.
        """
        password: String!
        """
        The gender of the user.
        """
        gender: String!
        """
        The number of followers of the user.
        """
        followersCount: Int!
        """
        The number of users the user is following.
        """
        followingCount: Int!
        """
        Json Web Token for Authentication
        """
        token: String
    }

    input LoginUser {
        email: String
        password: String
    }


    """
    Represents the input values used for register or edit users.
    """
    input RegisterInput {
        """
        The name of the user.
        """
        name: String
        """
        The username of the user.
        """
        userName: String
        """
        The email address of the user.
        """
        email: String
        """
        The password of the user.
        """
        password: String
        """
        The gender of the user.
        """
        gender: String
    }

    extend type Query {
        """
        Retrieves a user by their ID.
        """
        user(id: ID!): User!
        """
        Retrieves all users.
        """
        getUsers: [User!]!
    }

    extend type Mutation {
        """
        Register a new user with the provided input values.
        """
        registerUser(registerInput: RegisterInput): User!
        """
        Login user with the provided credentials 
        """
        loginUser(loginInput: LoginUser): User!
        """
        Deletes a user with the specified ID.
        """
        deleteUser(id: ID!): Boolean!
        """
        Edits an existing user with the provided ID and input values.
        """
        editUser(id: ID!, editUserInput: RegisterInput): Boolean!
        """
        Log out the currently authenticated user.
        """
        logOut: Boolean!
    }
    
`;
