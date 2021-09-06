import React from "react";
import TabPanel from "./Tabs";
import Error from "./Error";
import Loading from "./Loading";
import "./styles/SearchResults.css";

export default function SearchResults(props) {
  const { movieName, handleAddFav, removeFav, searchResults, error, loading } =
    props;

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
