import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          SpotShare
        </Typography>
        <Box display="flex">
          <Button variant="contained" size="medium">
            <Link to="/new-spot">Ajouter un spot</Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
