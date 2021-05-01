import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

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
    "&.Mui-disabled": {
      color: "ghostwhite",
      backgroundColor: "darkgrey",
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
    color: "white",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      // backgroundColor: "#393e46",
      // backgroundColor: "#222831",
      backgroundColor: "#191919",
    },
  },
}))(TableRow);

export default function NominateButton(props) {
  let detailsURL = `http://www.omdbapi.com/?apikey=d66f3ecf&i=`;
  const [movieDetails, setMovieDetails] = useState({});
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
      setMovieDetails((prevValues) => ({
        ...prevValues,
        Genre: details.Genre,
        Plot: details.Plot,
        Actors: details.Actors,
        Awards: details.Awards,
        imdbRating: details.imdbRating,
      }));
    });
  };

  getDetails();

  function createData(genre, plot, actors, awards) {
    return { genre, plot, actors, awards };
  }

  // Object.keys(movieDetails);

  const rows = [
    createData("Genre", movieDetails.Genre),
    createData("Plot", movieDetails.Plot),
    createData("Actors", movieDetails.Actors),
    createData("Awards", movieDetails.Awards),
  ];

  return (
    <div>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <StyledTableCell align="center">{row.genre}</StyledTableCell>
                <StyledTableCell align="center">{row.plot}</StyledTableCell>
                <StyledTableCell align="center">{row.actors}</StyledTableCell>
                <StyledTableCell align="center">{row.awards}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <h1>Genre: {genre}</h1>
      <p> Plot: {plot}</p> */}
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
