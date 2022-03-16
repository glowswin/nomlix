const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  original_name: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetTvsResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRateMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getUpCommingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getLatestTvs() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getAiringTvs() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopluarTvs() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
export function getTopLateTvs() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearchMovies(searchKey: string | undefined) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${searchKey}`
  ).then((response) => response.json());
}
export function getSearchTvs(searchKey: string | undefined) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${searchKey}`
  ).then((response) => response.json());
}
