import React from "react";
import { Link } from "react-router-dom";
import earth from "../Img/earth.png"
import Redearth from "../Img/Redearth.png"
import "./Pictures.css"
export const Planet = ({planet}) => {


    let imgtype 
    if (planet.planetTypeId === 1) {
        imgtype = <img src={earth} width="200" height="200" />
    } else {
        imgtype = <img src={Redearth} width="200" height="200" />
    }

    

    return (
        <div className="picture">
            <Link to={`/planet/${planet.id}`}>
                {imgtype}
            </Link>
            <p>{planet.name}</p>
        </div>
    )
}