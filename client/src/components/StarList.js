import React, { useEffect, useState } from "react";
import { Star } from "./Star";
import { getStars } from "../modules/starManager";


export const StarList = () => {

    const [ stars, setStars ] = useState([])

    const getSomeStars = () => {
        getStars()
        .then(stars => setStars(stars))
    }

    useEffect(() => {
        getSomeStars()
    }, [])

    return (
        <div>
            <div>
                {stars.map((star) => (
                    <Star star={star} key={star.id} />
                ))}
            </div>
        </div>
    )
}