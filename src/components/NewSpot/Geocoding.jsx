import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import "./new-spot.css"

const loadOptions = async (inputValue, callback) => {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
  const data = await response.json();

  let result = data.features.map((feature) => {
    return {
      label: feature.place_name,
      value: { center: feature.center },
    };
  });

  return callback(result);
};

function Geocoding({ handleResult }) {
  return (
    <div id="geocoding-select">
      <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions onChange={handleResult} placeholder="Entrez un lieu" className="lieu" />
    </div>
  );
}

export default Geocoding;
