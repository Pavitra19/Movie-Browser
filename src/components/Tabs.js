import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import MovieDetails from "./MovieDetails";

function TabPanel(props) {
  const { children, value, index, id, searchResults, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: 650,
    marginTop: "43px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginLeft: "18px",
  },
}));

export default function VerticalTabs(props) {
  const { removeFav, searchResults, handleAddFav, favs } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (value < props.searchResults.length - 1) {
            if (e.key === "ArrowDown" && value >= 0) {
              setValue(value + 1);
            } else if (e.key === "ArrowUp") {
              setValue(value - 1);
            }
          }
        }}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {searchResults.map((movie, index) => (
          <Tab key={index} label={movie.title} {...a11yProps(index)} />
        ))}
      </Tabs>
      {searchResults.map((movie, index) => (
        <TabPanel value={value} index={index} key={`${index} ${movie.imdbID}`}>
          <MovieDetails
            favs={favs}
            Title={movie.title}
            img={movie.url}
            year={movie.year}
            imdbID={movie.imdbID}
            handleAddFav={handleAddFav}
            removeFav={removeFav}
          />
        </TabPanel>
      ))}
    </div>
  );
}
