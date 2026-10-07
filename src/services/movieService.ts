import axios from 'axios';
import type { MoviePage } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const movieApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
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
