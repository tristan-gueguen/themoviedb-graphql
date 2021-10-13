import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    movie(id: ID!): Movie
    actor(id: ID!): Person
    director(id: ID!): Person
  }

  "A movie"
  type Movie {
    id: ID!
    imdb_id: ID!
    """
    Title in Original Language
    """
    original_title: String!
    original_language: String!
    """
    English title
    """
    title: String!
    release_year: Int
    budget: Int
    revenue: Int
    vote_average: Float!
    similar_movies: [Movie]
    actors(first: Int): [Person]
    directors: [Person]
  }

  enum Profession {
    ACTOR
    DIRECTOR
  }

  type Person {
    id: ID!
    imdb_id: ID!
    name: ID!
    popularity: Float
    profession: Profession!
    movies(first: Int): [Movie]!
  }
`;

export default typeDefs;
