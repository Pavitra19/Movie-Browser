import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import MovieDetails from "./MovieDetails";

export default function SearchBar() {
  const [movieName, setMovieName] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [showButton, setShowButton] = useState(false);
  let movieList = [];

  let URL = "http://www.omdbapi.com/?r=json&apikey=d66f3ecf&s=";

  const handleChange = (event) => {
    setMovieName(event.target.value);
    // URL += `${movieName}`;

    // fetch(URL).then((data) => {
    // console.log("data: ", data.json());
    //   console.log(data.json());
    //   setSearchResults(data.json());
    //   return data.json();
    // return data;
    // });
    //   .then((result) => console.log("Result here: ", result))
    //   .then((res) => console.log(res));
  };

  //   const handleSubmit = () => {
  //     URL += `${movieName}`;

  //     fetch(URL)
  //       //   .then((data) => {
  //       //     console.log("data: ", data.json());
  //       //     setSearchResults(data);
  //       //     // return data.json();
  //       //     return data;
  //       //   })
  //       .then((data) => data.json())
  //       .then((result) =>
  //         console.log("Result here: ", showResults(result.Search))
  //       )
  //       .then((res) => console.log(res));
  //   };

  const showResults = (result) => {
    console.log("Rsults in fn: ", result);
    URL += `${movieName}`;
    console.log("URL is: ", URL);

    fetch(URL)
      .then(async (data) => {
        data = await data.json();
        console.log("data: ", data);
        const { Search } = data;
        Search.forEach((movie) => {
          movieList.push({
            title: movie.Title,
            url: movie.Poster,
            year: movie.Year,
            imdbID: movie.imdbID,
          });
        });
        console.log("movielist: ", movieList);
        setSearchResults(movieList);
        // setShowButton(true);
      })
      .then((response) => console.log(response));
  };

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={handleChange}
          value={movieName}
          onKeyDown={(e) => {
            console.log(e.key);
            if (e.key === "Enter") {
              showResults(searchResults);
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      {searchResults &&
        searchResults.map((movie) => (
          <MovieDetails
            Title={movie.title}
            img={movie.url}
            year={movie.year}
            imdbID={movie.imdbID}
          />
        ))}
    </div>
  );
}
