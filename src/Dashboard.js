import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faArrowUp } from '@fortawesome/free-solid-svg-icons'

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

    const handleUpvoted = (movieIndex)=>{

      const updateMovieData = [...movieData]
      updateMovieData[movieIndex].totalVoted++;
      setMovieData(updateMovieData);

      fetch('https://hoblist.com/api/movieList',{
        method: 'POST' ,
        body: JSON.stringify({movieId:updateMovieData[movieIndex].id}),
        headers:{
          'Content-Type' : 'application/json'
        },
      });
    };
   
    
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='outer-dash-box'>
      <div className='inner-dash-box'>
  
    <h2>Movie Dashboard</h2>
    <ul>
      {movieData.map((movie, index) => (
        <div>
            <div className='parent'>
            <div className='icon'>
            <FontAwesomeIcon icon={faArrowUp} className='up'onClick={()=>handleUpvoted(index)} /> 
            <span className='vote'>{movie.totalVoted}</span>
            <FontAwesomeIcon icon={faArrowUp} rotation={180} className='down'  />         </div>
            <img src={movie.poster} className='card-image' alt={movie.title} />
                <div className='child'>
                <li key={index} >
            <h2 className='card-title'>{movie.title}</h2>
          <p className='card-item'>Genre:{movie.genre}</p>
          <p className='card-item'>Director:{movie.director}</p>
          <p className='card-item'>starring:{movie.stars}</p>
          <p className='card-time'>{movie.runTime}Mins | {movie.language} | {movie.releasedDate}</p>
          <p className='card-view'>{movie.pageViews}views | {movie.language} | voted by {movie.totalVoted} people</p>
          <button type='submit'> Watch tariler</button>
         
        </li>
                </div>
            </div>
        </div>
      ))}
    </ul>
    <button className="dashboard-button">Load More</button>
  </div>
  </div>
  
);
}

export default Dashboard;
