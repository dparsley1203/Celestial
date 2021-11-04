import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button } from "reactstrap";
import { deleteMoon, getMoonById } from "../modules/moonManager";

export const MoonDetail = () => {

    const [ moon, setMoon ] = useState([])
    const { id } = useParams();
    const history = useHistory();


    useEffect(() => {
        getMoonById(id)
        .then(setMoon)
    }, [])

    const handleClickDeleteMoon = () => {
        const confirm = window.confirm("Are you sure you want to delete this moon?")
        if(confirm == true)
        {deleteMoon(moon)
        .then(moons => setMoon(moons))
        .then(() =>history.push("/"))} else {
        return;
    }}

    const handleClickEditMoon = () => {
        history.push(`/moon/edit/${moon.id}`)
    }

    const moonSpeedPerDay = (((moon.distanceFromPlanet + moon.planet?.diameter) * 2 * 3.14) / moon.orbitalPeriod).toLocaleString('en-Us')
    const moonSpeedPerHour = ((((moon.distanceFromPlanet + moon.planet?.diameter)* 2 * 3.14) / moon.orbitalPeriod) / 24).toLocaleString('en-Us')
    const milesTraveled = ((moon.distanceFromPlanet + moon.planet?.diameter) * 2 * 3.14).toLocaleString('en-Us')

    return (
        <div id="container">
            <div id="primary">
                <h1>Moon Details</h1>
                <p> Moon Name: {moon.name}</p>
                <p> Moon Diameter: {moon.diameter} miles</p>
                <p> Moon Distance from Planet: {moon.distanceFromPlanet} miles</p>
                <p> Moon Orbital Period: {moon.orbitalPeriod} days</p>
                <p> Moon orbits around Planet {moon.planet?.name}</p>
                <p> This type of Moon is called a {moon.moonType?.type} Moon</p>
            </div>

            <div id="content">
                <h2>Fun Facts about your Moon!</h2><br></br>
                <p>This moon travles around its star at ~{moonSpeedPerDay} miles per day or ~{moonSpeedPerHour} mph </p>
                <p>This moon travels ~ {milesTraveled} miles in a year</p>
            </div>

            <Button onClick={handleClickDeleteMoon}color="danger">Delete Moon</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={handleClickEditMoon}color="primary">Edit Moon</Button>
        </div>
    )
}