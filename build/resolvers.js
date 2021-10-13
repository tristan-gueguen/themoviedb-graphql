"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        movie: (_, { id }, { dataSources }) => dataSources.movieAPI.getMovie(id),
    },
    Movie: {
        similar_movies: ({ id }, __, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const ret = yield dataSources.movieAPI.getSimilarMovies(id);
            return ret.results;
        }),
        actors: ({ id }, { first }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const ret = yield dataSources.movieAPI.getCredits(id);
            return ret.cast
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, first);
        }),
        directors: ({ id }, __, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const ret = yield dataSources.movieAPI.getCredits(id);
            return ret.crew.filter((item) => item.job === "Director");
        }),
    },
    Person: {
        movies: ({ id }, { first }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const ret = yield dataSources.movieAPI.getCreditsPerson(id);
            return ret.cast
                .sort((a, b) => b.vote_average - a.vote_average)
                .slice(0, first);
        }),
    },
};
exports.default = resolvers;
