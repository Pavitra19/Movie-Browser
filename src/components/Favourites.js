import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import IconButton from "@material-ui/core/IconButton";
import MovieIcon from "@material-ui/icons/Movie";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ShareButton from "./ShareButton";
// import { getQueryIDs, setNewURL } from "./constants/url";

export default function Favourites(props) {
  const { deviceType, favs, removeFav } = props;
  const numFavs = favs.length;
  let placeholderCards = [];

  useEffect(() => {
    console.log("location favs page", window.location.href);
    const queryString = window.location.search;
    console.log("queryString: ", queryString);
    if (queryString.includes("?favourites=")) {
      const ids = queryString.split("?favourites=")[1];
      console.log("ids: ", ids);
      const idsArray = ids.split(",");
      console.log("idsArray: ", idsArray);
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
      <h1> Your favourites all in one place.</h1>
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
                title="Remove"
                style={{
                  color: "crimson",
                  position: "absolute",
                  right: "112px",
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
        {/* <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/1/15/Yeh_jawani_hai_deewani.jpg"
            alt="movie1"
          />
        </div>
        <div>
          <img
            src="https://img.studioflicks.com/wp-content/uploads/2018/02/Padmaavat-movie-posters.jpg"
            alt="movie2"
          />
        </div>
        <div>
          <img
            src="https://m.media-amazon.com/images/M/MV5BZjAzZjZiMmQtMDZmOC00NjVmLTkyNTItOGI2Mzg4NTBhZTA1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg"
            alt="movie3"
          />
        </div>*/}
      </Carousel>
    </div>
  );
}
