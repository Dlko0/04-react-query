import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MoviePage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const movieApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function getMovies(
  page: number,
  query: string,
): Promise<MoviePage> {
  const response = await movieApi.get<MoviePage>('/search/movie', {
    params: {
      page,
      query,
    },
  });

  return response.data;
}
