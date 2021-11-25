import React, { useState } from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import UseStyles from './styles'

const List = ({ places }) => {
    const classes = UseStyles();
    const [type, setType] = useState('ville');
    const [seasons, setSeason] = useState('');
    
    return (
        <div className={classes.container}>
            <Typography className variant="h4">Ville, Littoral, Montagne, Autres</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="ville">Ville</MenuItem>
                    <MenuItem value="littoral">Littoral</MenuItem>
                    <MenuItem value="montagne">Montagne</MenuItem>
                    <MenuItem value="autres">Autres</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Season</InputLabel>
                <Select value={seasons} onChange={(e) => setSeason(e.target.value)}>
                    <MenuItem value="printemps">Printemps</MenuItem>
                    <MenuItem value="ete">Eté</MenuItem>
                    <MenuItem value="automne">Automne</MenuItem>
                    <MenuItem value="hiver">Hiver</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid item key={i} xs={12}>
                        <PlaceDetails place={place} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default List;