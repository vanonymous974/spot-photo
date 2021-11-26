import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import ReactMapGL, {
  Marker,
  Popup,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab";

import useStyles from "./styles";
import Context from "../../lib/context";

export default function HomeMap({ setCoordinates, setBounds, coordinates }) {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width:600px)");
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
  const { spots, setSpots } = useContext(Context);
  const [showPopup, togglePopup] = React.useState(false);

  function handleClick(event) {
    // console.log(event);
    // console.table(spotMarkers);
    setSpots([...spots, event.lngLat]);
  }
  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

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

        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="top-right"
          marker={false}
        />
        <NavigationControl style={navControlStyle} />

        {spots.map((spot, idx) => {
          // console.log(spot);
          return (
            <Marker
              key={"marker-spot-" + idx}
              latitude={spot.latitude}
              longitude={spot.longitude}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSpot(spot);
                  togglePopup(true);
                }}
              >
                <img
                  src="./icon_point.svg"
                  alt="Pin Icon"
                  width="40px"
                  height="20px"
                />
              </button>
            </Marker>
          );
        })}

        {showPopup && selectedSpot && (
          <Popup
            latitude={selectedSpot.longitude}
            longitude={selectedSpot.latitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => togglePopup(false)}
            anchor="top"
          >
            <div>Hello je suis là</div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
