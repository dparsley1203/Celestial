import React from "react";
import { useEffect, useState } from "react";
import { Container, Input } from "reactstrap";
import { useHistory, useParams } from "react-router"
import { starTypes } from "../modules/starTypeManager";
import { getStarsById } from "../modules/starManager";

const StarDetailForm = () => {

    const [ star, setStar ] = useState([])
    const [ starDetail, setStarDetail ] = useState({
        starId: "",
        notes: ""
    })

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getStarsById(id)
        .then(star => setStar(star))
    }, [])

    const handleInput = (event) => {
        const newStarDetail = {...starDetail}
        newStarDetail[event.target.id] = event.target.value
        setStarDetail(newStarDetail)
    }

    const handleCreateStarDetail = () => {


        const newStarDetail = {
            
            starId: id, // used params to get number from browser in order to save planetId to the message/detail I was looking at
            notes: starDetail.notes
        }
        
        addStarDetail(newStarDetail)
        .then(history.push(`/star/${id}`))
        
    }
}