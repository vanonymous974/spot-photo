import React, { useState } from 'react'
import useLocalState from '../lib/useLocalState'

function NewSpot() {
    const [spots, setSpots] = useLocalState([])
    const [formData, setFormData] = useState({})

    //Valide le form
    function handleSubmit(event) {
        event.preventDefault()
        // console.log(event)

        // Initialisation de la variable qui va contenir les valeurs du form
        let formResult = {}
        
        // Parcours le tableau des éléments HTML du form
        for (let i = 0; i < event.target.length; i++) {
            const element = event.target[i];
            console.log(element)
            if (element.nodeName == 'INPUT') {
                //Ajoute à formResult les valeurs trouvés dans les inputs du form
                formResult[element.name] = element.value
            }
        }
        // Ajoute à la const setSpots 
        setSpots([...spots, formResult])
        // console.log(formResult)
    }

    return (
        <div>
            <h1>New</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="name">
                        Nom du spot
                    </label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="city">
                        Ville
                    </label>
                    <input type="text" name="city" id="city" />
                </div>
                <div>
                    <label htmlFor="city">
                        Longitude
                    </label>
                    <input type="text" name="longitude" id="longitude" />
                </div>
                <button type="submit">Créer mon spot</button>
            </form>

            <pre>
                {JSON.stringify(spots, null, 4)}
            </pre>
        </div>
    )
}

export default NewSpot
