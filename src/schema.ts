import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    movie(id: ID!): Movie
    actor(id: ID!): Person
    director(id: ID!): Person
    searchMovie(query: String): SearchMoviePage
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
    image: String
    overview: String
    popularity: Float
    runtime: Int
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
    biography: String
    image: String
  }

  type SearchMoviePage {
    page: Int
    results: [SearchMovieResult]
    total_pages: Int
    total_results: Int
  }

  type SearchMovieResult {
    id: ID!
    poster_path: String
    original_title: String
    name: String
    vote_average: Float!
    release_year: Int
    image: String
  }
`;

export default typeDefs;
