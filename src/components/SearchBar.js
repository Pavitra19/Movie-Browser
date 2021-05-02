import React, { useEffect, useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import TabPanel from "./Tabs";

export default function SearchBar(props) {
  const { handleAddFav, removeFav } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [movieName, setMovieName] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState();
  let movieList = [];

  let URL = "https://www.omdbapi.com/?r=json&apikey=d66f3ecf&s=";

  useEffect(
    () => console.log("error ", error, "searchResults: ", searchResults),
    [error, searchResults]
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showResults = (result) => {
    setMovieName(searchTerm);
    // console.log("Rsults in fn: ", result);
    URL += `${searchTerm}`;
    // console.log("URL is: ", URL);

    fetch(URL)
      .then(async (data) => {
        data = await data.json();
        console.log("data: ", data);
        const { Response } = data;
        if (Response === "True") {
          const { Search } = data;
          Search.forEach((movie) => {
            movieList.push({
              title: movie.Title,
              url: movie.Poster,
              year: movie.Year,
              imdbID: movie.imdbID,
            });
          });
          // console.log("movielist: ", movieList);
          setSearchResults(movieList);
          // setShowButton(true);
        } else {
          const { Error } = data;
          setError(Error);
          setSearchResults([]);
        }
      })
      .then((response) => console.log("response", response));
  };

  return (
    <>
      <FormControl style={{ color: "white" }}>
        <InputLabel
          style={{ color: "white" }}
          htmlFor="input-with-icon-adornment"
        >
          Search
        </InputLabel>
        <Input
          style={{ color: "white" }}
          id="input-with-icon-adornment"
          onChange={handleChange}
          value={searchTerm}
          onKeyDown={(e) => {
            // console.log(e.key);
            if (e.key === "Enter" && searchTerm.trim().length > 0) {
              showResults(searchResults);
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon style={{ color: "white" }} />
            </InputAdornment>
          }
        />
      </FormControl>
      {searchResults && searchResults.length ? (
        <>
          <h1>Results for {movieName}</h1>
          <TabPanel
            favs={props.favs}
            handleAddFav={handleAddFav}
            removeFav={removeFav}
            searchResults={searchResults}
          />
        </>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
}
