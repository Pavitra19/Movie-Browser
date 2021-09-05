import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    // color: "red",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "black",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchBar(props) {
  const { handleSearch } = props;
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const classes = useStyles();

  let movieList = [];

  let URL = "https://www.omdbapi.com/?r=json&apikey=d66f3ecf&s=";

  useEffect(() => localStorage.setItem("searchTerm", searchTerm), [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const showResults = () => {
    URL += `${searchTerm}`;
    handleSearch(searchTerm, URL, movieList);
    // setSearchTerm("");
  };

  return (
    <>
      <FormControl style={{ color: "white" }}>
        <InputBase
          placeholder="Search…"
          onChange={handleChange}
          value={searchTerm}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim().length > 0) {
              showResults();
            }
          }}
          endAdornment={
            searchTerm && (
              <IconButton aria-label="Clear search" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            )
          }
        />
      </FormControl>
    </>
  );
}
