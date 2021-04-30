import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
    "&.Mui-disabled": {
      color: "ghostwhite",
      backgroundColor: "darkgrey",
    },
  },
}));

export default function NominateButton(props) {
  let detailsURL = `http://www.omdbapi.com/?apikey=d66f3ecf&i=`;
  const [genre, setGenre] = useState();
  const [plot, setPlot] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const getDetails = () => {
    detailsURL += `${props.imdbID}`;
    fetch(detailsURL).then(async (details) => {
      details = await details.json();
      // console.log("details: ", details);
      setGenre(details.Genre);
      setPlot(details.Plot);
    });
  };

  getDetails();

  return (
    <div>
      <h1>{genre}</h1>
      <p>{plot}</p>
      <div className={classes.root}>
        {props.favs.length === 2 && (
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
        disabled={props.favs.length >= 5}
      >
        Favourite
      </Button>
    </div>
  );
}
