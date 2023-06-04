import { typeDefs as User } from '../collections/users/typeDefs';
import { typeDefs as Post } from '../collections/posts/typeDefs';

const Query = `#graphql
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  """
    Represents the values returned when a object was successfully created.
    """
    type SuccessfullyCreated  {
        """
        Indicates the creation of a document by MongoDB.
        A value of true means the user was successfully created.
        """
        acknowledged: Boolean
        """
        The ID of the object that was recently created, returned from MongoDB.
        """
        insertedId: String
        """
        A custom message returned by the server.
        """
        message: String
    }

`;

export default [Query, User, Post];
