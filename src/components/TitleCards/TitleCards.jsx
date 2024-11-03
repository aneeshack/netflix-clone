// import React from 'react'
import { useRef, useEffect, useState } from "react";
// import cards_data from '../../assets/cards/Cards_data';
import "./TitleCards.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TitleCards = (props) => {
  const { title, category } = props;

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOThjZGVjOTAzMDZmOWMzYjdmYjlmNWM4NWNmNTE4NSIsIm5iZiI6MTcyODkyODI5MS4wMjEzNzcsInN1YiI6IjY0NzQ0Njc5OTQwOGVjMDBjMjhmNjg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8qjdeJGTQ6jgqqegx8_Fne2ATGZlDAZYYfOSaz8DPXc",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setApiData(response.results);
        console.log(response);
      })
      .catch((err) => console.log(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  },[]);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
};

export default TitleCards;
