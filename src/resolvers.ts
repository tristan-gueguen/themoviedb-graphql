const resolvers = {
  Query: {
    movie: (_, { id }, { dataSources }) => dataSources.movieAPI.getMovie(id),
    actor: (_, { id }, { dataSources }) => dataSources.movieAPI.getActor(id),
    director: (_, { id }, { dataSources }) =>
      dataSources.movieAPI.getDirector(id),
  },
  Movie: {
    similar_movies: async ({ id }, __, { dataSources }) => {
      const ret = await dataSources.movieAPI.getSimilarMovies(id);
      return ret.results;
    },
    actors: async ({ id }, { first }, { dataSources }) => {
      const credits = await dataSources.movieAPI.getCredits(id);
      return credits.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, first)
        .map((item) => dataSources.movieAPI.getActor(item.id));
    },
    directors: async ({ id }, __, { dataSources }) => {
      const credits = await dataSources.movieAPI.getCredits(id);
      return credits.crew
        .filter((item) => item.job === "Director")
        .map((item) => dataSources.movieAPI.getDirector(item.id));
    },
    release_year: ({ release_date }) => {
      const tryYear = release_date?.slice(0, 4) || NaN;
      if (isNaN(tryYear)) {
        return null;
      }
      return tryYear;
    },
  },
  Person: {
    movies: async ({ id, profession }, { first }, { dataSources }) => {
      const ret = await dataSources.movieAPI.getCreditsPerson(id, profession);
      if (profession === "DIRECTOR") {
        return ret.crew
          .filter((item) => item.job === "Director")
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, first);
      } else {
        return ret.cast
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, first);
      }
    },
  },
};

export default resolvers;
