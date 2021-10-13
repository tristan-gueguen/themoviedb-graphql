import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { MovieAPI } from "./datasources/movie-api";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      movieAPI: new MovieAPI(),
    };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    `);
});
