import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieIcon from "@material-ui/icons/Movie";

export default function Favourites(props) {
  const { deviceType, favs } = props;
  const numFavs = favs.length;
  let placeholderCards = [];

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
        <div>
          {/* <div className="placeholder-cards"> */}
          {/* <img
            src="https://image.pngaaa.com/545/88545-middle.png"
            alt="pick a movie"
            style={{ backgroundColor: "black" }}
          /> */}
          <MovieIcon className="placeholder-icon" />
          <h4> Pick a favourite for it to show up here</h4>
        </div>
      );
    }
  }

  return (
    <div>
      <h1> Your Favourites all in one place.</h1>

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={deviceType !== "mobile" ? true : false}
        // autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all 5"
        transitionDuration={5000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="fav-carousel"
      >
        {favs.map((movie) => {
          return (
            <div>
              <img src={movie.img} alt={movie.Title} />
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