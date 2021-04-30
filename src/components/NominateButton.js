import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();

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
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        endIcon={<FavoriteIcon />}
        onClick={props.handleClick}
        disabled={props.favs.length >= 5}
      >
        Favourite
      </Button>
    </div>
  );
}
