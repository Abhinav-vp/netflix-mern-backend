import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("/api/watchlist", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setWatchlist(res.data);
            } catch (err) {
                console.error("Failed to fetch watchlist", err);
            }
        };

        fetchWatchlist();
    }, []);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const movieDetailsPromises = watchlist.map(async (item) => {
                // Fetch each movie from TMDB by its ID. Need to ensure tmdb instance is correctly configured or using standard axios.
                try {
                    // We need the TMDB API key to fetch movie details. I will use standard axios.
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${item.movieId}?api_key=17866d40be3a733fc9950af1b3b20909`);
                    return response.data;
                } catch (_) {
                    try {
                        // Fallback to TV show search if movie fetch fails
                        const tvResponse = await axios.get(`https://api.themoviedb.org/3/tv/${item.movieId}?api_key=17866d40be3a733fc9950af1b3b20909`);
                        return tvResponse.data;
                    } catch (err) {
                        console.error("Error fetching detail for ID:", item.movieId, err);
                        return null;
                    }
                }
            });

            const results = await Promise.all(movieDetailsPromises);
            setMovies(results.filter(movie => movie !== null));
        };

        if (watchlist.length > 0) {
            fetchMovieDetails();
        } else {
            setMovies([]);
        }
    }, [watchlist]);

    const handleRemove = async (movieId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`/api/watchlist/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update UI after successful removal
            setWatchlist(watchlist.filter(item => item.movieId !== movieId));
        } catch (error) {
            console.error("Failed to remove movie", error);
        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ padding: "100px 20px 20px" }}>
                <h1 style={{ color: "white", marginBottom: "20px" }}>My Watchlist</h1>
                {movies.length === 0 ? (
                    <p style={{ color: "white" }}>Your watchlist is empty.</p>
                ) : (
                    <div className="row">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {movies.filter(movie => movie && movie.poster_path).map((movie) => (
                                <div key={movie.id} style={{ position: 'relative' }}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.name || movie.title}
                                        style={{ width: '200px', cursor: 'pointer', marginBottom: '10px' }}
                                    />
                                    <button
                                        onClick={() => handleRemove(movie.id)}
                                        style={{ display: 'block', width: '100%', padding: '5px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
