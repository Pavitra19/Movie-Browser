import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  //   index: PropTypes.any.isRequired,
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
    // backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 650,
    marginTop: "43px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const { removeFav } = props;
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
              // console.log("arrowdown", value);
              setValue(value + 1);
            } else if (e.key === "ArrowUp") {
              // console.log("arrowup", value);
              setValue(value - 1);
            }
          }
        }}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {props.searchResults.map((movie, index) => (
          <Tab label={movie.title} {...a11yProps(index)} />
        ))}
      </Tabs>
      {props.searchResults.map((movie, index) => (
        <TabPanel value={value} index={index}>
          <MovieDetails
            favs={props.favs}
            Title={movie.title}
            img={movie.url}
            year={movie.year}
            imdbID={movie.imdbID}
            handleAddFav={props.handleAddFav}
            removeFav={removeFav}
          />
        </TabPanel>
      ))}
    </div>
  );
}
