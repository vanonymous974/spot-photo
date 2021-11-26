import "./App.css";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "../api";
import HomeMap from "../components/HomeMap";
import Header from "../components/Header/Header";
import List from "../components/List/List";
import PlaceDetails from "../components/PlaceDetails/PlaceDetails";
import { LngLatBounds } from "mapbox-gl";

const App = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {}
    );
  }, []);

  useEffect(() => {
    console.log(coordinates, bounds);

    getPlacesData().then((data) => {
      // console.log(data);

      setPlaces(data);
    });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <HomeMap
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
