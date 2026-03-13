import { useEffect, useState } from "react";
import axios from "axios";
import tmdbAxios from "../services/tmdb";
import { requests } from "../services/tmdb";
import { useNavigate } from "react-router-dom";

export default function Banner() {
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await tmdbAxios.get(requests.fetchTrending);
            const results = response.data.results;
            const randomMovie = results[Math.floor(Math.random() * results.length)];
            setMovie(randomMovie);
        }
        fetchData();
    }, []);

    if (!movie) return null;

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    const handleAddToList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            // alert("Please login to add movies to your list");
            navigate("/login");
            return;
        }

        try {
            await axios.post(
                "/api/watchlist",
                { movieId: movie.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`${movie.title || movie.name || movie.original_name} added to your Watchlist!`);
        } catch (error) {
            console.error("Error adding to watchlist", error);
            alert(error.response?.data?.error || "Failed to add to watchlist");
        }
    };

    return (
        <div
            className="banner"
            style={{ backgroundImage: `url(${backdropUrl})` }}
        >
            <div className="banner__content">
                <h1 className="banner__title">
                    {movie.title || movie.name || movie.original_name}
                </h1>
                <p className="banner__description">{movie.overview}</p>
                <div className="banner__buttons">
                    <button className="banner__btn banner__btn--play">▶ Play</button>
                    <button className="banner__btn banner__btn--list" onClick={handleAddToList}>+ My List</button>
                </div>
            </div>
        </div>
    );
}
