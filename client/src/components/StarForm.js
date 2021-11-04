import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Container, Input } from "reactstrap"
import { addStar, getStarById, updateStar } from "../modules/starManager";
import { starTypes } from "../modules/starTypeManager";
import Swal from "sweetalert2"

const StarForm = () => {

    const history = useHistory();
    const [ starType, setStarType ] = useState([])
    const [ star, setStar ] = useState({
        name: "",
        diameter: "",
        mass: "",
        starTypeId: "",
        temperature: "",
    })

    const  starId  = useParams();

    if(starId.id && star.name === "")
    {
        getStarById(starId.id)
        .then(star => setStar(star))
    }

    const handleInput = (event) => {
        const newStar = {...star}
        newStar[event.target.id] = event.target.value
        setStar(newStar)
    }
    
    const handleCreateStar = () => {

        if (star.name === 0 || star.diameter === 0 || star.mass === 0 || star.starTypeId === 0 || star.temperature === 0 || 
            star.name === "" || star.diameter === "" || star.mass === "" || star.starTypeId === "" || star.temperature === ""  )
        {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please ensure all fields are filled out correctly',
          }).then(history.push('/star/create'))
        } else {

          
        addStar(star)
        .then(history.push('/'))
        }
    }

    const handleUpdateStar = () => {

        if (star.name === 0 || star.diameter === 0 || star.mass === 0 || star.starTypeId === 0 || star.temperature === 0 || 
            star.name === "" || star.diameter === "" || star.mass === "" || star.starTypeId === "" || star.temperature === ""  )
        {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please ensure all fields are filled out correctly',
        }).then(history.push(`/star/edit/${starId.id}`))

    } else {
        updateStar(star)
        // .then(getStarById(starId.id))
        // .then(star => setStar(star))
        .then(history.push(`/star/${starId.id}`))
        }
    }

    const handleClickCancel = () => {
        history.push(`/star/${starId.id}`)
    }

    useEffect(() => {
        starTypes()
        .then(type => setStarType(type))
    }, []);

    return (
        <Container>
            <div className="starForm">
                <h3>Create a new Star</h3>
                <div className="container-5">
                <div className ="form-group">
                    <label for="name">Name</label>
                    <Input type="name" class="form-control" id="name" placeholder ="name" value={star.name} onChange={handleInput} required/>

                    <label for="diameter">Diameter</label>
                    <Input type="text" class="form-control" id="diameter" placeholder ="diameter in kilometers" value={star.diameter} onChange={handleInput} required/>

                    <label for="mass">Mass Sun is equal to 1 solar mass</label>
                    <Input type="text" class="form-control" id="mass" placeholder ="solor mass" value={star.mass} onChange={handleInput} required/>

                    <label for="starType">Star Type</label>
                    <Input type="select" name="select" id="starTypeId" value={parseInt(star.starTypeId)} onChange={handleInput} >
                        <option value={null}>Select a Star Type</option>
                        {starType.map((st) => {
                            return <option value={st.id}>{st.type}</option>
                            })}
                    </Input>

                    

                    <label for="temperature">Temperature</label>
                    <input type="number" class="form-control" id="temperature" placeholder ="temperature in kelvin degrees" value={star.temperature} onChange={handleInput} required/>
                </div>

                    {starId.id? 
                    <div>
                        <button type="submit" class="btn btn-primary mr-3" onClick={
                            handleUpdateStar
                        }>Update</button>

                        <button type="cancel" class="btn btn-primary mx-3" onClick={() => {
                            handleClickCancel()
                        }}>Cancel</button>

                    </div>
                    :
                    <button type="submit" class="btn btn-primary" onClick={() => {
                        handleCreateStar()
                    }}>Create</button>
                    }
                </div>
            </div>
        </Container>
    )

}

export default StarForm