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
    marginTop: "30px",
    "&.Mui-disabled": {
      color: "ghostwhite",
      backgroundColor: "darkgrey",
    },
  },
}));

const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
    color: "white",
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      // backgroundColor: "#393e46",
      // backgroundColor: "#222831",
      backgroundColor: "#191919",
    },
  },
}))(TableRow);

export default function NominateButton(props) {
  const { favs, imdbID } = props;

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

  getDetails();

  const checkNominated = () => {
    return favs.some((movie) => movie.imdbID === imdbID);
  };

  function createData(Genre, Plot, Runtime, Actors, Awards, imdbRating) {
    return { Genre, Plot, Runtime, Actors, Awards, imdbRating };
  }

  // Object.keys(movieDetails);

  const rows = [
    createData("GENRE", movieDetails.Genre),
    createData("PLOT", movieDetails.Plot),
    createData("RUNTIME", movieDetails.RunTime),
    createData("ACTORS", movieDetails.Actors),
    createData("AWARDS", movieDetails.Awards),
    createData("IMDB RATING", movieDetails.imdbRating),
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
                {Object.keys(movieDetails).map((info) => (
                  <StyledTableCell align="center">{row[info]}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </div>
  );
}
