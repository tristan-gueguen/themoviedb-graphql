import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3/";
  }

  willSendRequest(request: RequestOptions) {
    request.params.set("api_key", "a17fc404b398ef11d21753d352ee80d7");
  }

  getMovie(movieId: string) {
    return this.get(`movie/${movieId}`);
  }

  getSimilarMovies(movieId: string) {
    return this.get(`movie/${movieId}/similar`);
  }

  getCredits(movieId: string) {
    return this.get(`movie/${movieId}/credits`);
  }

  getCreditsPerson(personId: string) {
    return this.get(`person/${personId}/movie_credits`);
  }

  getPerson(personId: string) {
    return this.get(`person/${personId}`);
  }

  async getActor(personId: string) {
    const person = await this.getPerson(personId);

    return {
      ...person,
      profession: "ACTOR",
    };
  }

  async getDirector(personId: string) {
    const person = await this.getPerson(personId);
    return {
      ...person,
      profession: "DIRECTOR",
    };
  }

  searchMovie(query: string) {
    return this.get(`search/movie/`, {
      query
    });
  }
}

export { MovieAPI };
