const resolvers = {
  Query: {
    movie: (_, { id }, { dataSources }) => dataSources.movieAPI.getMovie(id),
  },
  Movie: {
    similar_movies: async ({ id }, __, { dataSources }) => {
      const ret = await dataSources.movieAPI.getSimilarMovies(id);
      return ret.results;
    },
    actors: async ({ id }, { first }, { dataSources }) => {
      const ret = await dataSources.movieAPI.getCredits(id);
      return ret.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, first);
    },
    directors: async ({ id }, __, { dataSources }) => {
      const ret = await dataSources.movieAPI.getCredits(id);
      return ret.crew.filter((item) => item.job === "Director");
    },
  },
  Person: {
    movies: async ({ id }, { first }, { dataSources }) => {
      const ret = await dataSources.movieAPI.getCreditsPerson(id);
      return ret.cast
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, first);
    },
  },
};

export default resolvers;
