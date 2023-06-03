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
        """
        The number of followers of the user.
        """
        followersCount: Int
        """
        The number of users the user is following.
        """
        followingCount: Int
    }

    """
    Represents the values returned when a user is successfully created.
    """
    type UserCreated  {
        """
        Indicates whether the user creation operation was acknowledged by MongoDB.
        A value of true means the user was successfully created.
        """
        acknowledged: Boolean
        """
        The ID of the user that was recently created, returned from MongoDB.
        """
        insertedId: String
        """
        A custom message returned by the server.
        """
        message: String
    }

    """
    Represents the input values used for creating and editing users.
    """
    input UserInput {
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
        """
        The number of followers of the user.
        """
        followersCount: Int
        """
        The number of users the user is following.
        """
        followingCount: Int
    }

    type Query {
        """
        Retrieves a user by their ID.
        """
        user(id: ID!): User!
        """
        Retrieves all users.
        """
        getUsers: [User!]!
    }

    type Mutation {
        """
        Creates a new user with the provided input values.
        """
        createUser(userInput: UserInput): UserCreated
        """
        Deletes a user with the specified ID.
        """
        deleteUser(id: ID!): Boolean
        """
        Edits an existing user with the provided ID and input values.
        """
        editUser(id: ID!, userInput: UserInput): Boolean
    }
`;