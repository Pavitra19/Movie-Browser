import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import MovieTable from "./MovieTable";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
    marginTop: "30px",
    "&.Mui-disabled": {
      color: "ghostwhite",
      backgroundColor: "darkgrey",
    },
  },
}));

export default function NominateButton(props) {
  const { favs, imdbID, removeFav } = props;

  let detailsURL = `https://www.omdbapi.com/?apikey=d66f3ecf&i=`;
  const [movieDetails, setMovieDetails] = useState({});
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => getDetails(), []);

  const getDetails = () => {
    detailsURL += `${imdbID}`;
    fetch(detailsURL).then(async (details) => {
      details = await details.json();
      // console.log("details: ", details);
      setMovieDetails((prevValues) => ({
        ...prevValues,
        Genre: details.Genre,
        Plot: details.Plot,
        RunTime: details.Runtime,
        Actors: details.Actors,
        Awards: details.Awards,
        imdbRating: details.imdbRating,
      }));
    });
  };

  // getDetails();

  const checkNominated = () => {
    return favs.some((movie) => movie.imdbID === imdbID);
  };

  return (
    <div>
      <MovieTable movieDetails={movieDetails} />
      <div className={classes.root}>
        {favs.length === 2 && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="warning">
              You've reached your max of 5 favourites!
            </Alert>
          </Snackbar>
        )}
      </div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<FavoriteIcon />}
        onClick={() => {
          props.handleClick();
          handleClick();
        }}
        disabled={checkNominated() || favs.length >= 6}
      >
        Favourite
      </Button>
      {checkNominated() && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<HighlightOffIcon />}
          onClick={removeFav}
        >
          Remove Favourite
        </Button>
      )}
    </div>
  );
}
