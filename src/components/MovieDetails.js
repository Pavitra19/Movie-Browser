import React from "react";
import MoviePreview from "./MoviePreview";
import NominateButton from "./NominateButton";

export default function MovieDetails(props) {
  let content = [];
  return (
    <div>
      <MoviePreview Title={props.Title} img={props.img} alt={props.Title} />
      <h4>{props.year}</h4>
      <NominateButton
        favs={props.favs}
        imdbID={props.imdbID}
        handleClick={() => {
          // content.push({
          //   Title: props.Title,
          //   img: props.img,
          //   alt: props.Title,
          // });
          props.handleAddFav({
            Title: props.Title,
            img: props.img,
            alt: props.Title,
          });
          // { Title: props.Title, img: props.img, alt: props.Title }
          // <MoviePreview
          //   //   Title={props.Title}
          //   //   img={props.img}
          //   //   alt={props.Title}
          //   {...props}
          // />
        }}
      />
    </div>
  );
}
