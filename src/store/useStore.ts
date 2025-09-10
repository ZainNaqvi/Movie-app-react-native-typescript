import { create } from "zustand";
import { getUpcomingMovies } from "../api/api";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface MoviesStore {
  allMovies: Movie[];     
  movies: Movie[];        
  loading: boolean;
  error: string | null;
  fetchMovies: () => Promise<void>;
  searchMovies: (query: string) => void;
  clearSearch: () => void;
}

export const useMoviesStore = create<MoviesStore>((set, get) => ({
  allMovies: [],
  movies: [],
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const allMovies = await getUpcomingMovies();
      set({ allMovies, movies: allMovies, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch movies", loading: false });
    }
  },

  searchMovies: (query: string) => {
    const { allMovies } = get();
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    set({ movies: filtered });
  },

  clearSearch: () => {
    set((state) => ({ movies: state.allMovies }));
  },
}));
