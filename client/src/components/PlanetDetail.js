import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Button } from "reactstrap";
import { getPlanetDetailsByPlanetId } from "../modules/planetDetailManager";
import { deletePlanet, getPlanetsById } from "../modules/planetManager";
import PlanetDetailForm from "./PlanetDetailForm";


export const PlanetDetail = () => {

    const [ planet, setPlanet ] = useState([])
    const [ planetDetails, setPlanetDetails ] = useState([])
    const { id } = useParams();
    const history = useHistory();

    const getPlanetDetails = () => {
        getPlanetDetailsByPlanetId(id).then(details => setPlanetDetails(details))
    }

    useEffect(() => {
        getPlanetsById(id)
        .then(setPlanet)
        .then(getPlanetDetails)
    }, [])

    const handleClickDeletePlanet = () => {
        const confirm = window.confirm("Are you sure you want to delete this star?")
        if(confirm == true)
        {deletePlanet(planet)
        .then(planets => setPlanet(planets))
        .then(history.push("/"))} else {
        return;
    }}

    const handleClickEditPlanet = () => {
        history.push(`/planet/edit/${planet.id}`)
    }

    //Not yet added
    // const handleClickedEditNote = () => {

    // }

    const planetSpeedPerDay = ((planet.distanceFromStar * 2 * 3.14) / planet.orbitalPeriod).toLocaleString('en-Us')
    const planetSpeedPerHour = (((planet.distanceFromStar * 2 * 3.14) / planet.orbitalPeriod) / 24).toLocaleString('en-Us')
    const milesTraveled = (planet.distanceFromStar * 2 * 3.14).toLocaleString('en-Us')
    const diameterFacts = (planet.diameter* 3.14 / 4).toFixed(0)

    return (
        <div id="container">
            <div id="primary">
                <h1>Planet Details</h1>
                <p> Planet Name: {planet.name}</p>
                <p> Planet Diameter: {planet.diameter} miles</p>
                <p> Planet Distance from Star: {planet.distanceFromStar} miles</p>
                <p> Planet Orbital Period: {planet.orbitalPeriod} days</p>
                <p> Planet orbits around Star: {planet.star?.name}</p>
                <p> Planet Type: {planet.planetType?.type}</p>
                <p> Planet color: {planet.color?.paint}</p>
            </div>

            <div id="content">
                <h2>Fun Facts about your Planet!</h2><br></br>
                <p>This planet travles around its star at ~{planetSpeedPerDay} miles per day or ~{planetSpeedPerHour} mph </p>
                <p>This planet travels ~ {milesTraveled} miles in a year</p>
                <p>If you walked the entire circomfrence of the planet it would take about {diameterFacts} hours</p>
            </div>

            <div id="secondary">
                <h2>Comments</h2>
                <section className="commentSection">{planetDetails?.map((pd) => (<p> {pd?.user?.userName}: <Link to={`/planet/notes/${id}`}>{pd.notes}</Link></p>))} </section><br></br><br></br>
            </div>
                        <div id="footer">
                            <PlanetDetailForm />
                        </div><br></br>
                        
                        <Button onClick={handleClickDeletePlanet}color="danger">Delete Planet</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={handleClickEditPlanet}color="primary">Edit Planet</Button>
        </div>

        
                
    )
}