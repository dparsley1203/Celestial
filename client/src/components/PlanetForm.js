import { useState } from "react"
import { useParams } from "react-router";




const PlanetForm = () => {

    const [ planetType, setPlanetType ] = useState([]);
    const [ planet, setPlanet ] = useState({
        name: "",
        diameter: "",
        distanceFromStar: "",
        orbitalPeriod: "",
        starId: "",
        planetTypeId: "",
        ColorId: "",
    })

    const planetId = useParams();
}