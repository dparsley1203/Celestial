import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Col, Button } from "reactstrap";
import { Star } from "./Star"; // not needed at the moment.  May add the star pic back later
import { deleteStar, getStars, getStarById } from "../modules/starManager";


export const StarDetail = () => {

    const [ star, setStar] = useState({});
    // const [ starDetails, setStarDetails ] = useState([])
    const { id } = useParams();
    const history = useHistory();

    // const getStarDetails = () => {
    //     getStarDetailsByStarId(id).then(details => setStarDetails(details))
    // }

    useEffect(() => {
        getStarById(id)
        .then(setStar)
        // .then(getStarDetails())
    }, []);

    const handleClickDeleteStar = () => {
        const confirm = window.confirm("Are you sure you want to delete this star?")
        if(confirm == true)
        {deleteStar(star)
        .then(getStars)
        .then(history.push("/"))} else {
        return;
    }}

    const handleClickEditStar = () => {
        history.push(`/star/edit/${star.id}`)
    }
    
    const kelvingToFahrenheit = ((star.temperature - 273.15) * 9/5 + 32)

    const diameterFacts = (star.diameter * 3.14 / 4).toLocaleString()
    const starMassFact = (star.mass * 333000).toLocaleString()
    const starHeatFact = (kelvingToFahrenheit / 2200).toLocaleString()

    return (
        <div id="container">
            <div id="primary">
                <h1>Star Details</h1>
                <p>Star Name: {star.name}</p>
                <p>Star Diameter: {star.diameter} km</p>
                <p>Star Mass: {star.mass} Solor Mass</p>
                <p>Star Surface Temperature: {star.temperature} K</p>
                <p>Star Type: {star.starType?.type}</p>
                <p>Star Detail: {star.starType?.details}</p>
            </div>

        <div id="content">
            <h2>Fun Facts about your Star!</h2><br></br>
            <p>If you walked the entire circomfrence of the star it would take about {diameterFacts} hours</p>
            <p>This star contains {starMassFact} times more mass than Earth</p>
            <p>This star is about {starHeatFact}x hotter than the hottest lava on earth</p>
        </div>

        {/* <h2>Comment Section</h2>
            <div className="container">{starDetails?.map((sd) => (<p> {sd.user.userName}: {sd.notes}</p>))} </div> */}


                <Button onClick={handleClickDeleteStar}color="danger">Delete</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={handleClickEditStar}color="primary">Edit</Button>

      </div>
    );
} 