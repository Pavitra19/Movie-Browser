import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Favourites from "./components/Favourites";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
}));

export default function App() {
  const [favs, setFavs] = useState([]);
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddFav = (movieDetails) => {
    const { props } = movieDetails;
    console.log("Clicked");
    setFavs((prevProps) => {
      return [...prevProps, props];
    });
    console.log("movieDeets", props);
  };

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static" color="default">
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
        </AppBar>
        <TabPanel value={value} index={0}>
          <Favourites deviceType="desktop" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SearchBar handleAddFav={handleAddFav} favs={favs} />
        </TabPanel>
      </div>
    </div>
  );
}
