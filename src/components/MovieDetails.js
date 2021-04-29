import React from "react";

export default function MovieDetails(props) {
  return (
    <div>
      <h1>{props.Title}</h1>
      <img src={props.img} alt={props.Title} />
    </div>
  );
}
