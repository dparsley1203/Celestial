import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Col, Button } from "reactstrap";
import { getPlanetDetailsByPlanetId } from "../modules/planetDetailManager";
import { deletePlanet, getPlanetsById } from "../modules/planetManager";

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
        .then(getPlanetDetails())
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

    console.log(planet)
    return (
        <div>
            <p> Planet Name: {planet.name}</p>
            <p> Planet Diameter: {planet.diameter}</p>
            <p> Planet Distance from Star: {planet.distanceFromStar}</p>
            <p> Planet Orbital Period: {planet.orbitalPeriod}</p>
            <p> Belongs to Star: {planet.star?.name} </p>
            <p> Planet Type: {planet.planetType?.type}</p>
            <p> Planet color: {planet.color?.paint}</p>
            <div className="container">{planetDetails?.map((pd) => (<p> {pd.user.userName}: {pd.notes}</p>))} </div>

                <Col>
                    <Button onClick={handleClickDeletePlanet}color="danger">Delete</Button>
                </Col>
                <Col>
                    <Button onClick={handleClickEditPlanet}color="primary">Edit</Button>
                </Col>
        </div>
    )
} 