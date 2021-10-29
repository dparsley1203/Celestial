import React from "react";
import { Link } from "react-router-dom";
import BlueSun from "../Img/BlueSun.png";
import YellowSun from '../Img/YellowSun.png';
import { PlanetList } from "./PlanetList";
import "./ApplicationViews"
import "./Pictures.css"


export const Star = ({star}) => {

    let imgtype 
    if (star.starTypeId === 1) {
        imgtype = <img src={BlueSun} width="250" height="250" />
    } else {
        imgtype = <img src={YellowSun} width="250" height="250" />
    }

//    console.log(planet)

//     let planetimgtype
//     if (planet.planetTypeId === 1) {
//         planetimgtype = <img src={Redearth} width="200" height="100"/> 
//     } else {
//         planetimgtype = <img src={earth} width="200" height="100"/> 
//     }
    

    return (
        <>
        <div className="star">
            
            <Link to={`/star/${star.id}`}>
                {imgtype}
            </Link>
        </div>
        <p>{star.name}</p>
            <div><PlanetList /></div>

        {/* <div>
            <Link to={`/planet/${planet.id}`}>
                {planetimgtype}
            </Link>
        </div>
        <p>{planet.name}</p> */}
        </>
    )
}