import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { Container, Input } from "reactstrap";
import { addMoon, getMoonsById, updateMoon } from "../modules/moonManager";
import { moonTypes } from "../modules/moonTypeManager";
import { getPlanets } from "../modules/planetManager";
import Swal from "sweetalert2"


const MoonForm = () => {

    const [ moonType, setMoonType ] = useState([]);
    const [ planet, setPlanet ] = useState([]);

    const [ moon, setMoon ] = useState({
        name: "",
        diameter: "",
        distanceFromPlanet: "",
        orbitalPeriod: "",
        planetId: "",
        moonTypeId: "",
    })

    const moonId = useParams();
    const history = useHistory();

    //Gets the moon by id so the moons info will be shown in order to edit
    if (moonId.id && moon.name === "")
    {
        getMoonsById(moonId.id)
        .then(moon => setMoon(moon))
    }

    const handleInput = (event) => {
        const newMoon = {...moon}
        newMoon[event.target.id] = event.target.value
        setMoon(newMoon)
    }

    const handleCreateMoon = () => {

        if (moon.name === 0 || moon.diameter === 0 || moon.distanceFromPlanet === 0 || moon.orbitalPeriod === 0 || moon.moonTypeId === 0 || moon.planetId === 0 ||
            moon.name === "" || moon.diameter === "" || moon.distanceFromPlanet === "" || moon.orbitalPeriod === "" || moon.moonTypeId === "" || moon.planetId === "" )
            {Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please ensure all fields are filled out correctly',
              }).then(history.push('/moon/create'))
            } else {

        addMoon(moon)
        .then(history.push('/'))
            }
    }

    const handleUpdateMoon = () => {

        if (moon.name === 0 || moon.diameter === 0 || moon.distanceFromPlanet === 0 || moon.orbitalPeriod === 0 || moon.moonTypeId === 0 || moon.planetId === 0 ||
        moon.name === "" || moon.diameter === "" || moon.distanceFromPlanet === "" || moon.orbitalPeriod === "" || moon.moonTypeId === "" || moon.planetId === "" )
            {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please ensure all fields are filled out correctly',
              }).then(history.push(`/moon/edit/${moonId.id}`))

            } else {

        updateMoon(moon)
        .then(history.push(`/moon/${moonId.id}`))

            }
    }

    const handleClickCancel = () => {
        history.push(`/moon/${moonId.id}`)
    }

    useEffect(() => {
        moonTypes()
        .then(type => setMoonType(type))
        .then(getPlanets)
        .then(planet => setPlanet(planet))
    }, [])

    return (
        <Container>
            <div className="moonForm">
                <h3>Create a new Moon</h3>
                <div className="container-5">
                <div className ="form-group">
                    <label for="name">Name</label>
                    <Input type="name" class="form-control" id="name" placeholder ="name" value={moon.name} onChange={handleInput} required/>

                    <label for="diameter">Diameter</label>
                    <Input type="text" class="form-control" id="diameter" placeholder ="diameter in miles" value={moon.diameter} onChange={handleInput} required/>

                    <label for="distanceFromPlanet">Distance from Planet</label>
                    <Input type="text" class="form-control" id="distanceFromPlanet" placeholder ="distance in miles" value={moon.distanceFromPlanet} onChange={handleInput} required/>

                    <label for="orbitalPeriod">Orbital Period</label>
                    <Input type="text" class="form-control" id="orbitalPeriod" placeholder ="how many days to go around planet" value={moon.orbitalPeriod} onChange={handleInput} required/>

                    <label for="star">Assigned Planet</label>
                    <Input type="select" name="select" id="planetId" value={moon.planetId} onChange={handleInput} >
                        <option value={null}>What planet does the moon belong too</option>
                        {planet.map((p) => {
                            return <option value={p.id}>{p.name}</option>
                            })}
                    </Input>

                    <label for="moonType">Planet Type</label>
                    <Input type="select" name="select" id="moonTypeId" value={moon.moonTypeId} onChange={handleInput} >
                        <option value={null}>Select a planet Type</option>
                        {moonType.map((mt) => {
                            return <option value={mt.id}>{mt.type}</option>
                            })}
                    </Input>
                    
                </div>

                    {moonId.id? 
                    <div>
                        <button type="submit" class="btn btn-primary mr-3" onClick={
                            handleUpdateMoon
                        }>Update</button>

                        <button type="cancel" class="btn btn-primary mx-3" onClick={
                            handleClickCancel
                        }>Cancel</button>

                    </div>
                    :
                    <button type="submit" class="btn btn-primary" onClick={
                        handleCreateMoon
                    }>Create</button>
                    }
                </div>
            </div>
        </Container>
    )
}

export default MoonForm