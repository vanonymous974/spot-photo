import { useMediaQuery } from "@material-ui/core";
import "mapbox-gl/dist/mapbox-gl.css";
import React, {
  useCallback, useContext, useEffect, useRef, useState
} from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl, Marker, NavigationControl, Popup
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Context from "../../lib/context";
import useStyles from "./styles";


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
    top: 70,
  };
  const geolocateControlStyle = {
    right: 10,
    top: 110,
  };
  const navControlStyle = {
    right: 10,
    top: 150,
  };

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [spotMarkers, setSpotMarkers] = useState([]);
  const { spots, setSpots } = useContext(Context);
  const [showPopup, togglePopup] = React.useState(false);

  // function handleClick(event) {
  //   // console.log(event);
  //   // console.table(spotMarkers);
  //   setSpots([...spots, event.lngLat]);
  // }
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
        // onClick={handleClick}
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
            latitude={selectedSpot.latitude}
            longitude={selectedSpot.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => togglePopup(false)}
            anchor="top"
          >
            <div>{selectedSpot.name}</div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
