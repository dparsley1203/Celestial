import React from "react";
import { Link } from "react-router-dom";
import BStar from '../Img/BStar.png';
import OStar from '../Img/OStar.png';
import AStar from '../Img/AStar.png';
import FStar from '../Img/FStar.png';
import GStar from '../Img/GStar.png';
import KStar from '../Img/KStar.png';
import MStar from '../Img/MStar.png';
import { Planet } from "./Planet";
import "./ApplicationViews"
import "./Pictures.css"

//used props because we needed to pass in multiple objects into star (line 42 of StarList)
export const Star = (props) => {

    let imgtype 
    if (props.star.starTypeId === 1 && props.star.diameter <= 1000000) {
        imgtype = <img src={OStar} width="250" height="250" />
    } else if (props.star.starTypeId === 1 && props.star.diameter <= 5000000) {
        imgtype = <img src={OStar} width="325" height="325" />
    } else if (props.star.starTypeId === 1 && props.star.diameter > 5000001) {
        imgtype = <img src={OStar} width="400" height="400" /> 

    } else if (props.star.starTypeId === 2 && props.star.diameter <= 5000000) {
        imgtype = <img src={BStar} width="250" height="250" /> 
    } else if (props.star.starTypeId === 2 && props.star.diameter <= 5000000) {
        imgtype = <img src={BStar} width="325" height="325" /> 
    } else if (props.star.starTypeId === 2 && props.star.diameter > 5000001) {
        imgtype = <img src={BStar} width="400" height="400" /> 

    } else if (props.star.starTypeId === 3 && props.star.diameter <= 5000000) {
        imgtype = <img src={AStar} width="250" height="250" /> 
    } else if (props.star.starTypeId === 3 && props.star.diameter <= 5000000) {
        imgtype = <img src={AStar} width="325" height="325" /> 
    } else if (props.star.starTypeId === 3 && props.star.diameter > 5000001) {
        imgtype = <img src={AStar} width="400" height="400" /> 

    } else if (props.star.starTypeId === 4 && props.star.diameter <= 5000000) {
        imgtype = <img src={FStar} width="250" height="250" /> 
    } else if (props.star.starTypeId === 4 && props.star.diameter <= 5000000) {
        imgtype = <img src={FStar} width="325" height="325" /> 
    } else if (props.star.starTypeId === 4 && props.star.diameter > 5000001) {
        imgtype = <img src={FStar} width="400" height="400" /> 

    } else if (props.star.starTypeId === 5 && props.star.diameter <= 5000000) {
        imgtype = <img src={GStar} width="250" height="250" /> 
    } else if (props.star.starTypeId === 5 && props.star.diameter <= 5000000) {
        imgtype = <img src={GStar} width="325" height="325" /> 
    } else if (props.star.starTypeId === 5 && props.star.diameter > 5000001) {
        imgtype = <img src={GStar} width="400" height="400" /> 

    } else if (props.star.starTypeId === 6 && props.star.diameter <= 5000000) {
        imgtype = <img src={KStar} width="250" height="250" /> 
    } else if (props.star.starTypeId === 6 && props.star.diameter <= 5000000) {
        imgtype = <img src={KStar} width="325" height="325" /> 
    } else if (props.star.starTypeId === 6 && props.star.diameter > 5000001) {
        imgtype = <img src={KStar} width="400" height="400" /> 

    } else if (props.star.starTypeId === 7 && props.star.diameter <= 5000000) {
        imgtype = <img src={MStar} width="250" height="250" /> 
    } else if (props.star.starTypeId === 7 && props.star.diameter <= 5000000) {
        imgtype = <img src={MStar} width="325" height="325" /> 
    } else if (props.star.starTypeId === 7 && props.star.diameter > 5000001) {
        imgtype = <img src={MStar} width="400" height="400" /> 
        
    } else

        return null
    
 
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
            
        </div><br></br><br></br><br></br><br></br><br></br>
        </>
    )
}