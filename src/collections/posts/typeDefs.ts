export const typeDefs = `#graphql

  
 """
  Represents a date and time value.
  """
  scalar DateTime

  """
  Represents a post.
  """
  type Post {
    _id: ID
    OwnerId: ID
    createdAt: DateTime
    content: String
    likes: Int
    Participants: [Participant!]
    postStatus: String
  }

  """
  Represents a participant in a post.
  """
  type Participant {
    id_user: ID!
    status: String!
  }

  """
  Represents the input for a participant.
  """
  input ParticipantInput {
    id_user: ID
    status: String
  }

  """
  Represents the input for a post.
  """
  input PostInput {
    OwnerId: ID
    createdAt: DateTime
    content: String
    likes: Int
    Participants: [ParticipantInput!]
    postStatus: String
  }

  extend type Query {
    """
    Get a specific post by ID.
    """
    post(id: ID!): Post!

    """
    Get all posts.
    """
    getPosts: [Post!]
  }

  extend type Mutation {
    """
    Create a new post.
    """
    createPost(postInput: PostInput): SuccessfullyCreated!

    """
    Delete a post by ID.
    """
    deletePost(id: ID!): Boolean!

    """
    Update a post by ID.
    """
    updatePost(id: ID!, postInput: PostInput): Post!

    """
    Update the status of a participant in a post.
    """
    updateParticipantStatus(postId: ID!, participantId: ID!, status: String!): Post!
  }

`;
