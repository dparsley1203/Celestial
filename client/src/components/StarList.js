import React, { useEffect, useState } from "react";
import { Star } from "./Star";
import { getStars } from "../modules/starManager";
import { Planet } from "./Planet";
import { getPlanets } from "../modules/planetManager";
import { PlanetList } from "./PlanetList";
import "./Pictures.css"


export const StarList = () => {

    const [ stars, setStars ] = useState([])
    const [ planets, setPlanets ] = useState([])

    // const getSomeStars = () => {
    //     getStars()
    //     .then(stars => setStars(stars))
    // }

    // const getSomePlanets = () => {
    //     getPlanets()
    //     .then(planets => setPlanets(planets))
    // }

    useEffect(() => {
        getStars()
        .then(stars => setStars(stars))
        .then(getPlanets()
        .then((planets) => setPlanets(planets)))
    }, [])


    return (
        <div className="star">
            <div>
                
                {stars.map((star) =>  {
                    
                    const starPlanets = planets.filter((p) => p.starId === star.id)
                    const map = starPlanets.map(sp => sp)
                    
                   return <Star star={star} planet={map} key={star.id} />
                    })
                }
                
            </div>
            <div>

                {/* {planets.map((planet) => {
                    
                    const starPlanets = planets.filter(p => p.starId === star.id)
                    return <Planet planet={starPlanets} key={planet.id} />
                })} */}
            </div>
        </div>
    )
}

