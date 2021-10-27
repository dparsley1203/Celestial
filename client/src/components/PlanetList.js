import React, { useEffect, useState } from "react";
import { Planet } from "./Planet";
import { getPlanets } from "../modules/planetManager";
import { getStars } from "../modules/starManager";

export const PlanetList = () => {

    const [ planets, setPlanets ] = useState([])
    const [ stars, setStars ] = useState([])

    // const getSomePlanets = () => {
    //     getPlanets()
    //     .then(planets => setPlanets(planets))
    // }

    
    useEffect(() => {
        getPlanets()
        .then(planets => setPlanets(planets))
        .then(getStars()
        .then(stars => setStars(stars)))
    }, [])
    console.log(stars)
    console.log(planets)

    return (
        <div>
            <div>
                {planets.map(planet => (
                    <Planet planet={planet} key={planet.id} />
                ))}
            </div>
        </div>
    )
}

