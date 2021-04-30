import React from "react";
import MoviePreview from "./MoviePreview";
import NominateButton from "./NominateButton";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MovieDetails(props) {
  const classes = useStyles();

  return (
    <div>
      <MoviePreview Title={props.Title} img={props.img} alt={props.Title} />
      <h4>{props.year}</h4>
      <NominateButton
        favs={props.favs}
        imdbID={props.imdbID}
        handleClick={() =>
          props.handleAddFav(
            <MoviePreview
              //   Title={props.Title}
              //   img={props.img}
              //   alt={props.Title}
              {...props}
            />
          )
        }
      />
      <div className={classes.root}>
        {props.favs.length === 5 && (
          <Alert variant="filled" severity="warning">
            You've reached your max of 5 favourites!
          </Alert>
        )}
      </div>
    </div>
  );
}
