export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}
