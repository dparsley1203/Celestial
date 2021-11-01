import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RedPlanet from "../Img/RedPlanet.png"
import YellowPlanet from "../Img/YellowPlanet.png"
import BluePlanet from "../Img/BluePlanet.png"
import OrangePlanet from "../Img/OrangePlanet.png"
import PurplePlanet from "../Img/PurplePlanet.png"
import GreenPlanet from "../Img/GreenPlanet.png"
import RedGiant from "../Img/RedGiant.png"
import YellowGiant from "../Img/YellowGiant.png"
import BlueGiant from "../Img/BlueGiant.png"
import OrangeGiant from "../Img/OrangeGiant.png"
import PurpleGiant from "../Img/PurpleGiant.png"
import GreenGiant from "../Img/GreenGiant.png"
import RedIce from "../Img/RedIce.png"
import YellowIce from "../Img/YellowIce.png"
import BlueIce from "../Img/BlueIce.png"
import OrangeIce from "../Img/OrangeIce.png"
import PurpleIce from "../Img/PurpleIce.png"
import GreenIce from "../Img/GreenIce.png"
import "./Pictures.css"
import { getAllMoonsByUserId } from "../modules/moonManager";
import { Moon } from "./Moon";
import { RenderPlanet } from "./RenderPlanet";

export const Planet = ({planet}) => {

    const [ moons, setMoons ] = useState([])

    useEffect(() => {
        getAllMoonsByUserId()
        .then((moons) => setMoons(moons))
    }, [])

    let imgtype 
    if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 1) {
        imgtype = <img src={RedPlanet} width="80" height="80" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 1) {
        imgtype = <img src={RedPlanet} width="130" height="130" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 1) {
        imgtype = <img src={RedPlanet} width="160" height="160" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 2) {
        imgtype = <img src={YellowPlanet} width="80" height="80" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowPlanet} width="130" height="130" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowPlanet} width="160" height="160" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 3) {
        imgtype = <img src={BluePlanet} width="80" height="80" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 3) {
        imgtype = <img src={BluePlanet} width="130" height="130" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 3) {
        imgtype = <img src={BluePlanet} width="160" height="160" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 4) {
        imgtype = <img src={OrangePlanet} width="80" height="80" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangePlanet} width="130" height="130" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangePlanet} width="160" height="160" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 5) {
        imgtype = <img src={PurplePlanet} width="80" height="80" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 5) {
        imgtype = <img src={PurplePlanet} width="130" height="130" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 5) {
        imgtype = <img src={PurplePlanet} width="160" height="160" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 6) {
            imgtype = <img src={GreenPlanet} width="80" height="80" />
    } else if (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenPlanet} width="130" height="130" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenPlanet} width="160" height="160" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 1) {
        imgtype = <img src={RedGiant} width="80" height="80" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 1) {
        imgtype = <img src={RedGiant} width="130" height="130" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 1) {
        imgtype = <img src={RedGiant} width="160" height="160" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 2) {
        imgtype = <img src={YellowGiant} width="80" height="80" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowGiant} width="130" height="130" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowGiant} width="160" height="160" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 3) {
        imgtype = <img src={BlueGiant} width="80" height="80" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueGiant} width="130" height="130" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueGiant} width="160" height="160" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 4) {
        imgtype = <img src={OrangeGiant} width="80" height="80" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeGiant} width="130" height="130" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeGiant} width="160" height="160" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 5) {
        imgtype = <img src={PurpleGiant} width="80" height="80" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleGiant} width="130" height="130" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleGiant} width="160" height="160" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 6) {
        imgtype = <img src={GreenGiant} width="80" height="80" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenGiant} width="130" height="130" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenGiant} width="160" height="160" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 1) {
        imgtype = <img src={RedIce} width="80" height="80" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 1) {
        imgtype = <img src={RedIce} width="130" height="130" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 1) {
        imgtype = <img src={RedIce} width="160" height="160" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 2) {
        imgtype = <img src={YellowIce} width="80" height="80" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowIce} width="130" height="130" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowIce} width="160" height="160" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 3) {
        imgtype = <img src={BlueIce} width="80" height="80" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueIce} width="130" height="130" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueIce} width="160" height="160" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 4) {
        imgtype = <img src={OrangeIce} width="80" height="80" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeIce} width="130" height="130" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeIce} width="160" height="160" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 5) {
        imgtype = <img src={PurpleIce} width="80" height="80" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleIce} width="130" height="130" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleIce} width="160" height="160" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 6) {
        imgtype = <img src={GreenIce} width="80" height="80" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenIce} width="130" height="130" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenIce} width="160" height="160" />
        
    } else {
        imgtype = <img src={YellowPlanet} width="200" height="200" />
    }
    
    
    
    const planetMoons = moons.filter((m) => m.planetId === planet.id)
    
    return (
        <div className="picture">
            <Link to={`/planet/${planet.id}`}>
                {imgtype}
            </Link>
            <div>{planet.name}</div>
            {planetMoons.map(pm => {
                return  <Moon moon={pm} key={pm.id} />
            })}
        </div>
    )
    

    
    
}