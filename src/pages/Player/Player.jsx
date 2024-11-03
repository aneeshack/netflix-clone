// import React from 'react'
import './Player.css';
import backArrow from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import {  useNavigate, useParams,  } from 'react-router-dom';

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at :"",
    typeof:""
  })

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOThjZGVjOTAzMDZmOWMzYjdmYjlmNWM4NWNmNTE4NSIsIm5iZiI6MTcyODkyODI5MS4wMjEzNzcsInN1YiI6IjY0NzQ0Njc5OTQwOGVjMDBjMjhmNjg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8qjdeJGTQ6jgqqegx8_Fne2ATGZlDAZYYfOSaz8DPXc",
  },
  };

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => {
      setApiData(response.results[0])
      console.log(response)})
    .catch(err => console.log(err))

  })

  return (
    <div className='player'>
     <img src={backArrow} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player