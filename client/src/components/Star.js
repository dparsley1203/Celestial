import React from "react";
import { Link } from "react-router-dom";
import BlueSun from "../Img/BlueSun.png";
import YellowSun from '../Img/YellowSun.png';

export const Star = ({star}) => {

    console.log(star)
    let imgtype 
    if (star.starTypeId === 1) {
        imgtype = <img src={BlueSun} width="200" height="100" />
    } else {
        imgtype = <img src={YellowSun} width="100" height="50" />
    }
    

    return (
        <div>
            
            <Link to={`/star/${star.id}`}>
                {imgtype}
            </Link>
            
        </div>
    )
}