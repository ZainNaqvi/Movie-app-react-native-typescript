
import axios from "axios";

const API_KEY = "c02878ee5627233eb6bb88c8b75eca1c";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export const getUpcomingMovies = async () => {
    const response = await api.get(`/movie/upcoming?api_key=${API_KEY}`);
    console.log(response.data.results);
    return response.data.results; 
};

export const getMovieDetails = async (movieId: number) => {
    const response = await api.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
};
export const getMovieVideos = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}/videos?api_key=${API_KEY}`);
  return response.data.results; 
};

export const getMovieImages = async (movieId: number) => {
    const response = await api.get(`/movie/${movieId}/images?api_key=${API_KEY}`);
    return response.data;
};
