import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Favourites from "./components/Favourites";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import SearchResults from "./components/SearchResults";
// import NavBar from "./components/NavBar";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function App() {
  const [favs, setFavs] = useState(
    JSON.parse(sessionStorage.getItem("favs")) || []
  );
  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem("value")) || 0
  );
  const [movieName, setMovieName] = useState(
    sessionStorage.getItem("movieName") || null
  );
  const [searchResults, setSearchResults] = useState(
    JSON.parse(sessionStorage.getItem("searchResults")) || null
  );
  const [error, setError] = useState(
    JSON.parse(sessionStorage.getItem("error")) || null
  );
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    sessionStorage.setItem("favs", JSON.stringify(favs));
    sessionStorage.setItem("value", value);
    sessionStorage.setItem("searchResults", JSON.stringify(searchResults));
    sessionStorage.setItem("movieName", movieName);
    sessionStorage.setItem("error", JSON.stringify(error));
  }, [favs, value, searchResults, movieName, error]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (searchTerm, url, movieList) => {
    setMovieName(searchTerm);
    setLoading(true);
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (data) => {
        data = await data.json();
        const { Response } = data;
        if (Response === "True") {
          const { Search } = data;
          Search.forEach((movie) => {
            movieList.push({
              title: movie.Title,
              url: movie.Poster,
              year: movie.Year,
              imdbID: movie.imdbID,
            });
          });
          setSearchResults(movieList);
          setError(null);
        } else {
          const { Error } = data;
          setError(Error);
          setSearchResults([]);
        }
      })
      .then((response) => console.log("response", response));
    setLoading(false);

    setValue(1);
  };

  const handleAddFav = (movieDetails) => {
    setFavs((prevProps) => {
      return [...prevProps, movieDetails];
    });
  };

  const removeFav = (movieDetails) => {
    setFavs(favs.filter(({ Title }) => Title !== movieDetails.Title));
  };

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab icon={<HomeIcon />} label="Home" {...a11yProps(0)} />
              <Tab icon={<SearchIcon />} label="Search" {...a11yProps(1)} />
            </Tabs>

            <Typography className={classes.title} variant="h6" noWrap />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <SearchBar handleSearch={handleSearch} />
            </div>
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Favourites
            deviceType="desktop"
            favs={favs}
            handleAddFav={handleAddFav}
            removeFav={removeFav}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SearchResults
            movieName={movieName}
            favs={favs}
            error={error}
            searchResults={searchResults}
            loading={loading}
            handleAddFav={handleAddFav}
            removeFav={removeFav}
          />
        </TabPanel>
      </div>
    </div>
  );
}
