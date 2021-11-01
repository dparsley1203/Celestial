import React from "react";
import { Link } from "react-router-dom";
import BlueSun from "../Img/BlueSun.png";
import YellowSun from '../Img/YellowSun.png';
import { Planet } from "./Planet";
import "./ApplicationViews"
import "./Pictures.css"

//used props because we needed to pass in multiple objects into star (line 42 of StarList)
export const Star = (props) => {

    let imgtype 
    if (props.star.starTypeId === 1) {
        imgtype = <img src={BlueSun} width="250" height="250" />
    } else {
        imgtype = <img src={YellowSun} width="250" height="250" />
    }
    
 
    return (
        <>
        <div className="star">
            
            <Link to={`/star/${props.star.id}`}>
                {imgtype}
            </Link>
        </div>
        <p>{props.star.name}</p>

        <div>
            {props.planets.map(planet => <Planet planet={planet} key={planet.id} />)}
            
        </div>
        </>
    )
}