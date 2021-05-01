import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
    color: "white",
    borderBottom: "none",
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

// const useStyles = makeStyles({
//   table: {
//     // minWidth: 700,
//   },
// });

export default function MovieTable(props) {
  const { movieDetails } = props;
  // const classes = useStyles();

  function createData(Genre, Plot, Runtime, Actors, Awards, imdbRating) {
    return { Genre, Plot, Runtime, Actors, Awards, imdbRating };
  }

  const rows = [
    createData("GENRE", movieDetails.Genre),
    createData("RUNTIME", movieDetails.RunTime),
    createData("ACTORS", movieDetails.Actors),
    createData("IMDB RATING", movieDetails.imdbRating),
    createData("AWARDS", movieDetails.Awards),
    createData("PLOT", movieDetails.Plot),
  ];

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <TableCell
                component="th"
                scope="row"
                style={{ borderBottom: "none" }}
              >
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
  );
}
