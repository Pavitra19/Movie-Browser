import React from "react";

export default function MoviePreview(props) {
  return (
    <div>
      <h1 className="movie-title">{props.Title}</h1>
      <img src={props.img} alt={props.Title} />
    </div>
  );
}
