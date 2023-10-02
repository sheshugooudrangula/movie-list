import React, { useEffect, useState } from 'react';
import "./Dashboard.css";

function Dashboard() {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch('https://hoblist.com/api/movieList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'movies',
          language: 'kannada',
          genre: 'all',
          sort: 'voting',
        }),
      })
        .then((response) => {
          console.log('Response status:', response.status); 
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data:', data); 
          setMovieData(data.result);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error); 
          setError(error);
          setLoading(false);
        });
    },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="dashboard-container">
    <h2 className="dashboard-heading">Movie Dashboard</h2>
    <ul className="dashboard-list">
      {movieData.map((movie, index) => (
        <div>
            <div className='parent'>
            <img src={movie.poster} className='card-image' alt={movie.title} />
                <div className='child'>
                <li key={index} className="dashboard-list-item">
            <h2 className='card-title'>{movie.title}</h2>
          <p className='card-Genre'>Genre:{movie.genre}</p>
          <p className='card-director'>Director:{movie.director}</p>
          <p className='card-star'>starring:{movie.stars}</p>
          <p className='card-time'>{movie.runTime}Mins | {movie.language} | {movie.releasedDate}</p>
          <p className='card-view'>{movie.pageViews}views | {movie.language} | voted by {movie.totalVoted} people</p>
          <button className='bt' type="submit">watch trailer</button>
        </li>
                </div>
            </div>
        </div>
      ))}
    </ul>
    <button className="dashboard-button">Load More</button>
  </div>
);
}

export default Dashboard;
