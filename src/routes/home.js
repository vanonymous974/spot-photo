import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import HomeMap from "../components/HomeMap";

const Home = () => {
  //   const [places,setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {});
  }, []);

  //   useEffect(() => {
  //     console.log(coordinates, bounds);

  //     getPlacesData()
  //       .then((data) => {
  //           // console.log(data);

  //           setPlaces(data);
  //       })
  //   }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <HomeMap setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} />
    </>
  );
};

export default Home;
