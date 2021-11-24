import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import * as parkDate from "./data/skateboard-parks.json";

export default function HomeMap() {
  const [viewport, setViewport] = useState({
    latitude: 44.837789,
    longitude: -0.57918,
    width: "100vw",
    height: "100vh",
    zoom: 11,
  });

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [spotMarkers, setSpotMarkers] = useState([]);
  const [showPopup, togglePopup] = React.useState(false);

  function handleClick(event) {
    // console.log(event);
    // console.table(spotMarkers);
    setSpotMarkers([...spotMarkers, event.lngLat]);
  }

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
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        onClick={handleClick}
      >
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
