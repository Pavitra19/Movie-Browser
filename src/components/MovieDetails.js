import React from "react";
import NominateButton from "./NominateButton";

export default function MovieDetails(props) {
  return (
    <div>
      <h1>{props.Title}</h1>
      <img src={props.img} alt={props.Title} />
      <h6>{props.year}</h6>
      <NominateButton imdbID={props.imdbID} />
    </div>
  );
}
