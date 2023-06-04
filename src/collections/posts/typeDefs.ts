export const typeDefs = `#graphql

  
scalar DateTime

type Post {
  _id: ID
  OwnerId: ID
  createdAt: DateTime
  content: String
  likes: Int
  Participants: [Participant!]
  postStatus: String
}

type Participant {
  id_user: ID
  status: String
}

input ParticipantInput {
  id_user: ID
  status: String
}

input PostInput {
  OwnerId: ID
  createdAt: DateTime
  content: String
  likes: Int
  Participants: [ParticipantInput!]
  postStatus: String
}

extend type Query {
  post(id: ID!): Post
  getPosts: [Post!]
}

extend type Mutation {
  createPost(postInput: PostInput): SuccessfullyCreated!
  deletePost(id: ID!): Boolean
  updatePost(id: ID!, postInput: PostInput): Post!
  updateParticipantStatus(postId: ID!, participantId: ID!, status: String!): Post!
}





`;
