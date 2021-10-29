// Planet list is no longer needed.  Used Star list


// import React, { useEffect, useState } from "react";
// import { Planet } from "./Planet";
// import { getPlanets, getPlanetsBySunId } from "../modules/planetManager";
// import { getStars } from "../modules/starManager";
// import { useParams } from "react-router";

// export const PlanetList = () => {

//     const [ planets, setPlanets ] = useState([])
//     const [ stars, setStars ] = useState([])
//     const { id } = useParams();

//     // const getSomePlanets = () => {
//     //     getPlanets()
//     //     .then(planets => setPlanets(planets))
//     // }


//     useEffect(() => {
//         getPlanets()
//         .then(planets => setPlanets(planets))
//         .then(getStars()
//         .then(stars => setStars(stars)))
//     }, [])

//     // useEffect(() => {
//     //     getPlanetsBySunId(id)
//     //     .then(planets => setPlanets(planets))
//     //     .then(getStars()
//     //     .then(stars => setStars(stars)))
//     // }, [])

//     console.log(stars)
//     console.log(planets)

//     return (
//         <div>
//             <div>
//                 {
//                     planets.map(planet => (
//                         <Planet planet={planet} key={planet.id} />
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }


// // {planets.map(planet => (
// //     <Planet planet={planet} key={planet.id} />
// // ))}

// // planets.filter((planet) => {
// //     return planet.starId === stars.id
// // }).map(planet => {
// //     return <Planet planet={planet} key={planet.id} />
// // })