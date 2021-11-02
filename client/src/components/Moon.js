import React from "react"
import { Link } from "react-router-dom"
import FullMoon from "../Img/FullMoon.png"
import WaxingMoon from "../Img/WaxingMoon.png"
import WainingMoon from "../Img/WainingMoon.png"

export const Moon = ({moon}) => {

    let imgtype 
    if (moon.moonTypeId === 1 && moon.diameter < 1000) {
        imgtype = <img src={FullMoon} width="50" height="50" />
    } else if (moon.moonTypeId === 1 && moon.diameter <= 3000) {
        imgtype = <img src={FullMoon} width="75" height="75" shadow="0px, 16px" />
    } else if (moon.moonTypeId === 1 && moon.diameter > 3001) {
        imgtype = <img src={FullMoon} width="100" height="100" shadow="0px, 16px" />

    } else if (moon.moonTypeId === 2 && moon.diameter < 1000) {
        imgtype = <img src={WaxingMoon} width="50" height="50" />
    } else if (moon.moonTypeId === 2 && moon.diameter <= 3000) {
        imgtype = <img src={WaxingMoon} width="75" height="75" shadow="0px, 16px" />
    } else if (moon.moonTypeId === 2 && moon.diameter > 3001) {
        imgtype = <img src={WaxingMoon} width="100" height="100" shadow="0px, 16px" />

    } else if (moon.moonTypeId === 3 && moon.diameter < 1000) {
        imgtype = <img src={WainingMoon} width="50" height="50" />
    } else if (moon.moonTypeId === 3 && moon.diameter <= 3000) {
        imgtype = <img src={WainingMoon} width="75" height="75" shadow="0px, 16px" />
    } else if (moon.moonTypeId === 3 && moon.diameter > 3001) {
        imgtype = <img src={WainingMoon} width="100" height="100" shadow="0px, 16px" />

    } else {
        imgtype = <img src={WainingMoon} width="50" height="50" shadow="0px, 16px" />
    }

    console.log(moon)
    return (
        <div className="picture">
            <Link to={`/moon/${moon.id}`}>
                {imgtype}
            </Link>
            <p>{moon.name}</p>
        </div>
    )

}