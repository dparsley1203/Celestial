import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Col, Button } from "reactstrap";
import { Star } from "./Star"; // not needed at the moment.  May add the star pic back later
import { deleteStar, getStarsById } from "../modules/starManager";
import { getStarDetailsByStarId } from "../modules/starDetailManager";


export const StarDetail = () => {

    const [ star, setStar] = useState({});
    const [ starDetails, setStarDetails ] = useState([])
    const { id } = useParams();
    const history = useHistory();

    const getStarDetails = () => {
        getStarDetailsByStarId(id).then(details => setStarDetails(details))
    }

    useEffect(() => {
        getStarsById(id)
        .then(setStar)
        .then(getStarDetails())
    }, []);

    const handleClickDeleteStar = () => {
        const confirm = window.confirm("Are you sure you want to delete this star?")
        if(confirm == true)
        {deleteStar(star)
        .then(stars => setStar(stars))
        .then(history.push("/"))} else {
        return;
    }}

    const handleClickEditStar = () => {
        history.push(`/star/edit/${star.id}`)
    }
    

    return (
        <div>
            <p>Star Name: {star.name}</p>
            <p>Star Diameter: {star.diameter} km</p>
            <p>Star Mass: {star.mass} Solor Mass</p>
            <p>Star Temperature: {star.temperature} K</p>
            <p>Star Type: {star.starType?.type}</p>
            <p>Star Detail: {star.starType?.details}</p>
            <div className="container">{starDetails?.map((sd) => (<p> {sd.user.userName}: {sd.notes}</p>))} </div>

            <Col>
                <Button onClick={handleClickDeleteStar}color="danger">Delete</Button>
            </Col>
            <Col>
                <Button onClick={handleClickEditStar}color="primary">Edit</Button>
            </Col>
      </div>
    );
} 