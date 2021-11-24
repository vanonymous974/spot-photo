import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactMapGL, { Marker, Popup, FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
// import * as parkDate from "./data/skateboard-parks.json";

export default function HomeMap() {
  const [viewport, setViewport] = useState({
    latitude: 44.837789,
    longitude: -0.57918,
    width: "100vw",
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

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
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
        ref={mapRef}
        onViewportChange={handleViewportChange}
      >
        <FullscreenControl style={fullscreenControlStyle} />
        <GeolocateControl style={geolocateControlStyle} positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} auto />
        <Geocoder mapRef={mapRef} onViewportChange={handleGeocoderViewportChange} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} position="top-left" marker={false}/>
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
                }}
              >
                <img src="./skateboarding.svg" alt="Skate Park Icon" width="20px" height="20px" />
              </button>
            </Marker>
          );
        })}
        {showPopup && (
          <Popup latitude={selectedSpot[1]} longitude={selectedSpot[0]} closeButton={true} closeOnClick={false} onClose={() => togglePopup(false)} anchor="top">
            <div>You are here</div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
