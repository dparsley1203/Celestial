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
        imgtype = <img src={RedPlanet} width="100" height="100" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 1) {
        imgtype = <img src={RedPlanet} width="125" height="125" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 1) {
        imgtype = <img src={RedPlanet} width="140" height="140" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 2) {
        imgtype = <img src={YellowPlanet} width="100" height="100" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowPlanet} width="125" height="125" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowPlanet} width="140" height="140" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 3) {
        imgtype = <img src={BluePlanet} width="100" height="100" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 3) {
        imgtype = <img src={BluePlanet} width="125" height="125" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 3) {
        imgtype = <img src={BluePlanet} width="140" height="140" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 4) {
        imgtype = <img src={OrangePlanet} width="100" height="100" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangePlanet} width="125" height="125" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangePlanet} width="140" height="140" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 5) {
        imgtype = <img src={PurplePlanet} width="100" height="100" />
    } else if  (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 5) {
        imgtype = <img src={PurplePlanet} width="125" height="125" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 5) {
        imgtype = <img src={PurplePlanet} width="140" height="140" />

    } else if (planet.planetTypeId === 1 && planet.diameter <= 7000 && planet.colorId === 6) {
            imgtype = <img src={GreenPlanet} width="100" height="100" />
    } else if (planet.planetTypeId === 1 && planet.diameter < 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenPlanet} width="125" height="125" />
    } else if (planet.planetTypeId === 1 && planet.diameter > 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenPlanet} width="140" height="140" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 1) {
        imgtype = <img src={RedGiant} width="135" height="135" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 1) {
        imgtype = <img src={RedGiant} width="200" height="200" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 1) {
        imgtype = <img src={RedGiant} width="250" height="250" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 2) {
        imgtype = <img src={YellowGiant} width="135" height="135" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowGiant} width="200" height="200" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowGiant} width="250" height="250" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 3) {
        imgtype = <img src={BlueGiant} width="135" height="135" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueGiant} width="200" height="200" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueGiant} width="250" height="250" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 4) {
        imgtype = <img src={OrangeGiant} width="135" height="135" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeGiant} width="200" height="200" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeGiant} width="250" height="250" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 5) {
        imgtype = <img src={PurpleGiant} width="135" height="135" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleGiant} width="200" height="200" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleGiant} width="250" height="250" />

    } else if (planet.planetTypeId === 2 && planet.diameter <= 7000 && planet.colorId === 6) {
        imgtype = <img src={GreenGiant} width="135" height="135" />
    } else if  (planet.planetTypeId === 2 && planet.diameter < 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenGiant} width="200" height="200" />
    } else if (planet.planetTypeId === 2 && planet.diameter > 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenGiant} width="250" height="250" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 1) {
        imgtype = <img src={RedIce} width="120" height="120" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 1) {
        imgtype = <img src={RedIce} width="180" height="180" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 1) {
        imgtype = <img src={RedIce} width="225" height="225" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 2) {
        imgtype = <img src={YellowIce} width="120" height="120" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowIce} width="180" height="180" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 2) {
        imgtype = <img src={YellowIce} width="225" height="225" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 3) {
        imgtype = <img src={BlueIce} width="120" height="120" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueIce} width="180" height="180" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 3) {
        imgtype = <img src={BlueIce} width="225" height="225" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 4) {
        imgtype = <img src={OrangeIce} width="120" height="120" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeIce} width="180" height="180" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 4) {
        imgtype = <img src={OrangeIce} width="225" height="225" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 5) {
        imgtype = <img src={PurpleIce} width="120" height="120" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleIce} width="180" height="180" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 5) {
        imgtype = <img src={PurpleIce} width="225" height="225" />

    } else if (planet.planetTypeId === 3 && planet.diameter <= 7000 && planet.colorId === 6) {
        imgtype = <img src={GreenIce} width="120" height="120" />
    } else if  (planet.planetTypeId === 3 && planet.diameter < 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenIce} width="180" height="180" />
    } else if (planet.planetTypeId === 3 && planet.diameter > 10000 && planet.colorId === 6) {
        imgtype = <img src={GreenIce} width="225" height="225" />
        
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