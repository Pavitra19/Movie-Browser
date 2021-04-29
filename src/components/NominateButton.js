import React, { useState } from "react";

export default function NominateButton(props) {
  let detailsURL = `http://www.omdbapi.com/?apikey=d66f3ecf&i=`;
  const [genre, setGenre] = useState();
  const [plot, setPlot] = useState();

  const handleClick = () => {
    detailsURL += `${props.imdbID}`;
    fetch(detailsURL).then(async (details) => {
      details = await details.json();
      console.log("details: ", details);
      setGenre(details.Genre);
      setPlot(details.Plot);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Nominate</button>
      <h1>{genre}</h1>
      <p>{plot}</p>
    </div>
  );
}
