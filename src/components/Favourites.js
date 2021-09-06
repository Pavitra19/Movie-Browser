import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import IconButton from "@material-ui/core/IconButton";
import MovieIcon from "@material-ui/icons/Movie";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ShareButton from "./ShareButton";
import "./styles/Favourites.css";

export default function Favourites(props) {
  const { deviceType, favs, removeFav } = props;
  const numFavs = favs.length;
  let placeholderCards = [];

  useEffect(() => {
    const queryString = window.location.search;
    if (queryString.includes("?favourites=")) {
      const ids = queryString.split("?favourites=")[1];
      const idsArray = ids.split(",");
      idsArray.forEach((id) => getDetails(id));
    }
  }, []);

  const getDetails = (id) => {
    let detailsURL = `https://www.omdbapi.com/?apikey=d66f3ecf&i=${id}`;
    fetch(detailsURL).then(async (details) => {
      details = await details.json();
      if (!favs.some((movie) => movie.imdbID === id)) {
        props.handleAddFav({
          Title: details.Title,
          img: details.Poster,
          alt: details.Title,
          imdbID: details.imdbID,
        });
      }
    });
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  if (numFavs < 3) {
    let numPlaceholders = 3 - numFavs;
    for (let i = 0; i <= numPlaceholders; i++) {
      placeholderCards.push(
        <div key={i}>
          <MovieIcon className="placeholder-icon" />
          <h4> Pick a favourite to display</h4>
        </div>
      );
    }
  }

  return (
    <div>
      <h1
        style={{
          marginTop: "30px",
          fontSize: "30px",
          fontFamily: ("Noto Sans JP", "sans-serif"),
        }}
      >
        Your favourites all in one place.
      </h1>
      <ShareButton favs={favs} />

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={deviceType !== "mobile" && numFavs > 3 ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all 4"
        transitionDuration={4000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="fav-carousel"
      >
        {favs.map((movie) => {
          return (
            <div key={movie.imdbID}>
              <IconButton
                className="remove-button"
                title="Remove"
                style={{
                  color: "crimson",
                  position: "absolute",
                  top: "-21px",
                  zIndex: 1,
                }}
                onClick={() => removeFav(movie)}
              >
                <RemoveCircleIcon title="Remove" label="Remove" />
              </IconButton>

              <img
                src={movie.img}
                alt={movie.Title}
                style={{ position: "relative" }}
              />
              <h4>{movie.Title}</h4>
            </div>
          );
        })}
        {placeholderCards}
      </Carousel>
    </div>
  );
}
