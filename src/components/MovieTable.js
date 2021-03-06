import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

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
      backgroundColor: "#191919",
    },
  },
}))(TableRow);

export default function MovieTable(props) {
  const { movieDetails } = props;

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
      <Table aria-label="simple table" style={{ minWidth: "1100px" }}>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={`${row.name} ${index}`}>
              <TableCell
                component="th"
                scope="row"
                style={{ borderBottom: "none" }}
              >
                {row.name}
              </TableCell>
              {Object.keys(movieDetails).map((info, index) => (
                <StyledTableCell key={index} align="center">
                  {row[info]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
