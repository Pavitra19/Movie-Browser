import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import TabPanel from "./Tabs";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState();
  const [movieName, setMovieName] = useState();
  const [searchResults, setSearchResults] = useState();
  const [showButton, setShowButton] = useState(false);
  let movieList = [];

  let URL = "http://www.omdbapi.com/?r=json&apikey=d66f3ecf&s=";

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showResults = (result) => {
    setMovieName(searchTerm);
    console.log("Rsults in fn: ", result);
    URL += `${searchTerm}`;
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
    <>
      <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">Search</InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={handleChange}
          value={searchTerm}
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
      {searchResults && (
        <>
          <h1>Results for {movieName}</h1>
          <TabPanel searchResults={searchResults} />
        </>
      )}
    </>
  );
}
