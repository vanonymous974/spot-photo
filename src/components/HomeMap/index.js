import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactMapGL, { Marker, Popup, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab";

import useStyles from './styles';

export default function HomeMap({ setCoordinates, setBounds, coordinates, places }) {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');
  const [viewport, setViewport] = useState({
    latitude: 44.837789,
    longitude: -0.57918,
    width: "100%",
    height: "100vh",
    zoom: 11,
  });
  const fullscreenControlStyle = {
    right: 10,
    top: 10,
  };
  const geolocateControlStyle = {
    right: 10,
    top: 50,
  };
  const navControlStyle = {
    right: 10,
    top: 90,
  };

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [spotMarkers, setSpotMarkers] = useState([]);
  const [showPopup, togglePopup] = React.useState(false);

  function handleClick(event) {
    // console.log(event);
    // console.table(spotMarkers);
    setSpotMarkers([...spotMarkers, event.lngLat]);
  }
  const mapRef = useRef();

  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedSpot(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleClick}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        ref={mapRef}
        onViewportChange={handleViewportChange}
      > 
        <FullscreenControl style={fullscreenControlStyle} />
         {places?.map((place, i) =>(
            <div
                // className={classes.markerContainer}
                // latitude={Number(place.latitude)}
                // longitude={Number(place.longitude)}
                key={i}
            >
              {
                isMobile ? (
                  <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                ) : (
                      <Paper elevation={3} classeName={classes.paper}>
                        <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                          {place.name}
                        </Typography>
                        <img 
                            className={classes.pointer}
                            src={place.photo ? place.photo.images.large.url : "https://images.unsplash.com/photo-1527489377706-5bf97e608852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFuZHNjYXBlfHx8fHx8MTYzNzg1MzgyNg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"}
                            alt={place.name}
                            />
                      </Paper>
                )
                }
            </div>
         ))}
        <GeolocateControl style={geolocateControlStyle} positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} auto />
        <Geocoder mapRef={mapRef} onViewportChange={handleGeocoderViewportChange} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} position="top-right" marker={false}/>
        <NavigationControl style={navControlStyle} />
        {spotMarkers.map((spot, idx) => {
          console.log(spot);
          return (
            <Marker key={"marker-spot-" + idx} latitude={spot[1]} longitude={spot[0]}>
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSpot(spot);
                  togglePopup(true)
                }}
              >
                <img src="./icon_point.svg" alt="Skate Park Icon" width="40px" height="20px" />
              </button>
            </Marker>
          );
        })}
        {showPopup && selectedSpot && <Popup
          latitude={selectedSpot[1]}
          longitude={selectedSpot[0]}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top" >
          <div>Hello je suis là</div>
        </Popup>}
        
      </ReactMapGL>
    </div>
  );
}
