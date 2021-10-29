import React, { useEffect, useState } from "react";
import { Star } from "./Star";
import { getStars } from "../modules/starManager";
import { getPlanets } from "../modules/planetManager";
import "./Pictures.css"
import { getAllMoonsByUserId } from "../modules/moonManager";


export const StarList = () => {

    const [ stars, setStars ] = useState([])
    const [ planets, setPlanets ] = useState([])
    const [ moons, setMoons ] = useState([])

    useEffect(() => {
        getStars()
        .then(stars => setStars(stars))
        .then(getPlanets)
        .then((planets) => setPlanets(planets))
        .then(getAllMoonsByUserId)
        .then((moons) => setMoons(moons))
    }, [])

    return (
        <div className="star">
            <div>
                
                {stars.map((star) =>  {
                    
                    const starPlanets = planets.filter((p) => p.starId === star.id)
                    const planetMoons = moons.filter((m) => m.planetId === m.planet?.id)

                    //passed in star object and planet array into Star component on props
                   return <Star star={star} planets={starPlanets} moons={planetMoons} key={star.id} />
                    })
                }
                
            </div>
        </div>
    )
}

