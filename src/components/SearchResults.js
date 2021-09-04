import React, { useEffect, useState } from "react";
import TabPanel from "./Tabs";
import Error from "./Error";
import Loading from "./Loading";
import "./SearchResults.css";

export default function SearchResults(props) {
  const { movieName, handleAddFav, removeFav, searchResults, error, loading } =
    props;
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [movieName, setMovieName] = useState();
  //   const [searchResults, setSearchResults] = useState();
  //   const [error, setError] = useState();
  //   const [loading, setLoading] = useState(false);
  //   let movieList = [];

  //   let URL = "https://www.omdbapi.com/?r=json&apikey=d66f3ecf&s=";

  //   useEffect(() => console.log("searchResults: ", searchResults), [
  //     searchResults,
  //   ]);

  //   const showResults = (result) => {
  //     // handleSearch();

  //     setMovieName(searchTerm);
  //     setLoading(true);
  //     // console.log("Rsults in fn: ", result);
  //     URL += `${searchTerm}`;
  //     // console.log("URL is: ", URL);

  //     fetch(URL)
  //       .then(async (data) => {
  //         data = await data.json();
  //         console.log("data: ", data);
  //         const { Response } = data;
  //         if (Response === "True") {
  //           const { Search } = data;
  //           Search.forEach((movie) => {
  //             movieList.push({
  //               title: movie.Title,
  //               url: movie.Poster,
  //               year: movie.Year,
  //               imdbID: movie.imdbID,
  //             });
  //           });
  //           // console.log("movielist: ", movieList);
  //           setSearchResults(movieList);
  //           setError(null);
  //           // setShowButton(true);
  //         } else {
  //           const { Error } = data;
  //           setError(Error);
  //           setSearchResults([]);
  //         }
  //       })
  //       .then((response) => console.log("response", response));
  //     setLoading(false);
  //   };

  return (
    <>
      {loading && <Loading />}
      {searchResults && searchResults.length > 0 && (
        <>
          <h1 className="results-heading">Results for "{movieName}"</h1>
          <TabPanel
            favs={props.favs}
            handleAddFav={handleAddFav}
            removeFav={removeFav}
            searchResults={searchResults}
          />
        </>
      )}
      {!searchResults && (
        <>
          <h1 className="Search">Search</h1>
          <h2 className="Search-info">
            Please enter a movie in the search bar.
          </h2>
        </>
      )}
      {error && (
        <>
          <h1 className="results-heading">Results for "{movieName}"</h1>
          <Error errorMessage={error} />
        </>
      )}
    </>
  );
}
