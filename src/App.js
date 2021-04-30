import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  const [favs, setFavs] = useState([]);

  const handleAddFav = (movieDetails) => {
    const { props } = movieDetails;
    console.log("Clicked");
    setFavs((prevProps) => {
      return [...prevProps, props];
    });
    console.log("movieDeets", props);
  };

  return (
    <div className="App">
      <SearchBar handleAddFav={handleAddFav} favs={favs} />
    </div>
  );
}

export default App;
