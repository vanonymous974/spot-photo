import React, { useContext } from "react";
import Context from "../lib/context";
import Geocoder from "react-map-gl-geocoder";

function NewSpot() {
  const { spots, setSpots } = useContext(Context);

  //Valide le form
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event)

    // Initialisation de la variable qui va contenir les valeurs du form
    let formResult = {};

    // Parcours le tableau des éléments HTML du form
    for (let i = 0; i < event.target.length; i++) {
      const element = event.target[i];
      console.log(element);
      if (element.nodeName == "INPUT") {
        //Transformer Longitude et latitude en number pour + lisible pour mapbox
        if (element.name == "longitude" || element.name == "latitude") {
          formResult[element.name] = Number(element.value);
        } else {
          //Ajoute à formResult les valeurs trouvés dans les inputs du form
          formResult[element.name] = element.value;
        }
      }
    }

    // formResult["date"] = new Date()

    // Ajoute à la const setSpots les données de formResult
    setSpots([...spots, formResult]);
    // console.log(formResult)
  }

  return (
    <div>
      <h1>New</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom du spot</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="city">Ville</label>
          <input type="text" name="city" id="city" />
        </div>

        <div>
          <label htmlFor="latitude">Latitude</label>
          <input type="text" name="latitude" id="latitude" />
        </div>
        <div>
          <label htmlFor="longitude">Longitude</label>
          <input type="text" name="longitude" id="longitude" />
        </div>
        <button type="submit">Créer mon spot</button>
      </form>

      <pre>{JSON.stringify(spots, null, 4)}</pre>
    </div>
  );
}

export default NewSpot;
