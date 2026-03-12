import { useEffect, useState } from 'react';
import axios from '../services/tmdb';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
      return;
    }

    movieTrailer(movie?.name || movie?.title || movie?.original_name || '')
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error) => {
        console.log('Trailer not found:', error);
        alert('Trailer not found for this title.');
      });
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="row">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.name || movie.title}
            onClick={() => handleClick(movie)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
