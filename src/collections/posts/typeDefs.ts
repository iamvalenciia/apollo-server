export const typeDefs = `#graphql

  
  """
  Represents a date and time value.
  """
  scalar DateTime

  """
  Represents a post.
  """
  type Post {
    """
    The ID of the post.
    """
    _id: ID

    """
    The ID of the post owner.
    """
    OwnerId: ID

    """
    The creation date and time of the post.
    """
    createdAt: DateTime

    """
    The content of the post.
    """
    content: String

    """
    The number of likes the post has received.
    """
    likes: Int

    """
    The participants in the post.
    """
    Participants: [Participant!]

    """
    The status of the post.
    """
    postStatus: String
  }


  """
  Represents a participant in a post.
  """
  type Participant {
    """
    The ID of the participant user.
    """
    id_user: ID!

    """
    The status of the participant in the post.
    """
    status: String!
  }

  """
  Represents the input for a participant.
  """
  input ParticipantInput {
    """
    The ID of the participant user.
    """
    id_user: ID

    """
    The status of the participant in the post.
    """
    status: String
  }


  """
  Represents the input for a post.
  """
  input PostInput {
    """
    The ID of the owner of the post.
    """
    OwnerId: ID

    """
    The creation date of the post.
    """
    createdAt: DateTime

    """
    The content of the post.
    """
    content: String

    """
    The number of likes the post has.
    """
    likes: Int

    """
    The participants associated with the post.
    """
    Participants: [ParticipantInput!]

    """
    The status of the post.
    """
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
