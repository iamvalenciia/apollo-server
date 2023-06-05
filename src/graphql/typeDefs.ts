import { typeDefs as User } from '../collections/users/typeDefs';
import { typeDefs as Post } from '../collections/posts/typeDefs';

const Query = `#graphql
  """
  Root Query type.
  """
  type Query {
    _: String
  }

  """
  Root Mutation type.
  """
  type Mutation {
    _: String
  }

  """y
  Represents the values returned when an object was successfully created.
  """
  type SuccessfullyCreated {
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
