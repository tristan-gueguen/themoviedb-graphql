import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    movie(id: ID!): Movie
  }

  "A movie"
  type Movie {
    id: ID!
    imdb_id: ID!
    """
    Original title
    """
    original_title: String!
    original_language: String!
    title: String!
    release_date: String
    budget: Int
    revenue: Int
    vote_average: Float!
    similar_movies: [Movie]
    actors(first: Int): [Person]
    directors: [Person]
  }

  type Person {
    id: ID!
    imdb_id: ID!
    name: ID!
    known_for_department: String!
    popularity: Float
    movies(first: Int): [Movie]
  }
`;

export default typeDefs;
