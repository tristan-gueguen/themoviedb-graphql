"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieAPI = void 0;
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class MovieAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.themoviedb.org/3/";
    }
    willSendRequest(request) {
        request.params.set("api_key", "a17fc404b398ef11d21753d352ee80d7");
    }
    getMovie(movieId) {
        return this.get(`movie/${movieId}`);
    }
    getSimilarMovies(movieId) {
        return this.get(`movie/${movieId}/similar`);
    }
    getCredits(movieId) {
        return this.get(`movie/${movieId}/credits`);
    }
    getCreditsPerson(personId) {
        return this.get(`person/${personId}/movie_credits`);
    }
}
exports.MovieAPI = MovieAPI;
