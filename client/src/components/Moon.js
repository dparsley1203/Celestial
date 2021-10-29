import React from "react"
import { Link } from "react-router-dom"
import FullMoon from "../Img/FullMoon.png"

export const Moon = ({moon}) => {

    let imgtype 
    if (moon.moonTypeId === 1) {
        imgtype = <img src={FullMoon} width="50" height="50" />
    } else {
        imgtype = <img src={FullMoon} width="50" height="50" shadow="0px, 16px" />
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