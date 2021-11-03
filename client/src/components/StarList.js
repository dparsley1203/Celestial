import React, { useEffect, useState } from "react";
import { Star } from "./Star";
import { getStars } from "../modules/starManager";
import { getPlanets } from "../modules/planetManager";
import "./Pictures.css"


export const StarList = () => {

    const [ stars, setStars ] = useState([])
    const [ planets, setPlanets ] = useState([])


    useEffect(() => {
        getStars()
        .then(stars => setStars(stars))
        .then(getPlanets)
        .then((planets) => setPlanets(planets))
    }, [])

    return (
        <div className="star">
            <div>
                <h1>Solar System</h1>
                
                {stars.map((star) =>  {
                    
                    const starPlanets = planets.filter((p) => p.starId === star.id)


                    //passed in star object and planet array into Star component on props
                   return <Star star={star} planets={starPlanets} key={star.id} />
                    })
                }
                
            </div>
        </div>
    )
}

