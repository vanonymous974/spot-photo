import React, { useContext, useState } from "react";
import Context from "../lib/context";
import "../components/NewSpot/new-spot.css";
import { Link } from "react-router-dom";
import Geocoding from "../components/NewSpot/Geocoding";
import { Alert } from "@material-ui/lab";

function NewSpot() {
  const { spots, setSpots } = useContext(Context);
  const [geocodingResult, setGeocodingResult] = useState({});

  //Valide le form
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event)

    // Initialisation de la variable qui va contenir les valeurs du form
    let formResult = {};

    debugger

    // Parcours le tableau des éléments HTML du form
    for (let i = 0; i < event.target.length; i++) {
      const element = event.target[i];
      if (element.nodeName == "INPUT" && element.value !== "") {
        //Transformer Longitude et latitude en number pour + lisible pour mapbox
        // if (element.name == "longitude" || element.name == "latitude") {
        //   formResult[element.name] = Number(element.value);
        // } else {
        //Ajoute à formResult les valeurs trouvés dans les inputs du form
        formResult[element.name] = element.value;
        // }
      }
    }

    formResult.longitude = geocodingResult.value.center[0];
    formResult.latitude = geocodingResult.value.center[1];

    // formResult["date"] = new Date()

    // Ajoute à la const setSpots les données de formResult
    setSpots([...spots, formResult]);
    // console.log(formResult)
  }

  return (
    <div className="form">
      <h1>Ajouter un spot</h1>

      <form onSubmit={handleSubmit}>
        <div className="namespot">
          <label htmlFor="name">Nom du spot</label><br/>
          <input type="text" name="name" id="name" placeholder="Skatepark..."/>
        </div>
        {/* <div>
          <label htmlFor="city">Ville</label>
          <input type="text" name="city" id="city" />
        </div> */}

        <div>
          <Geocoding handleResult={(value) => setGeocodingResult(value)} />
        </div>

        <button className="buttons" type="submit" onClick={() => alert("Votre spot a été ajouté")}>
          Créer mon spot
        </button>
        <button className="buttons">
          <Link to="/">Retour à la map</Link>
        </button>
      </form>

      {/* <pre>{JSON.stringify(spots, null, 4)}</pre> */}
    </div>
  );
}

export default NewSpot;
