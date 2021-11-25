import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles'

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    BestSpots
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;