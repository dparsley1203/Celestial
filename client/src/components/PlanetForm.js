import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { Container, Input } from "reactstrap";
import { addPlanet, getPlanetsById, updatePlanet } from "../modules/planetManager";
import { planetTypes } from "../modules/planetTypeManager";
import { getStars } from "../modules/starManager";
import { getColors } from "../modules/colorManager";




const PlanetForm = () => {

    const [ planetType, setPlanetType ] = useState([]);
    const [ star, setStar ] = useState([]);
    const [ color, setColor ] = useState([]);
    
    const [ planet, setPlanet ] = useState({
        name: "",
        diameter: "",
        distanceFromStar: "",
        orbitalPeriod: "",
        starId: "",
        planetTypeId: "",
        colorId: "",
    })
    
    const planetId = useParams();
    const history = useHistory();

    if (planetId.id && planet.name === "")
    {
        getPlanetsById(planetId.id)
        .then(planet => setPlanet(planet))
    }

    const handleInput = (event) => {
        const newPlanet = {...planet}
        newPlanet[event.target.id] = event.target.value
        setPlanet(newPlanet)
    }

    const handleCreatePlanet = () => {
        addPlanet(planet)
        .then(history.push('/'))
    }

    const handleUpdatePlanet = () => {
        updatePlanet(planet)
        .then(history.push(`/planet/${planetId.id}`))
    }

    const handleClickCancel = () => {
        history.push(`/planet/${planetId.id}`)
    }

    useEffect(() => {
        planetTypes()
        .then(type => setPlanetType(type))
        .then(getStars)
        .then(star => setStar(star))
        .then(getColors)
        .then(color => setColor(color))
    }, [])

    return (
        <Container>
            <div className="starForm">
                <h3>Create a new Planet</h3>
                <div className="container-5">
                <div className ="form-group">
                    <label for="name">Name</label>
                    <Input type="name" class="form-control" id="name" placeholder ="name" value={planet.name} onChange={handleInput} required/>

                    <label for="diameter">Diameter</label>
                    <Input type="text" class="form-control" id="diameter" placeholder ="diameter in miles" value={planet.diameter} onChange={handleInput} required/>

                    <label for="distanceFromStar">Distance from Star</label>
                    <Input type="text" class="form-control" id="distanceFromStar" placeholder ="distance in miles" value={planet.distanceFromStar} onChange={handleInput} required/>

                    <label for="orbitalPeriod">Orbital Period</label>
                    <Input type="text" class="form-control" id="orbitalPeriod" placeholder ="how many days to go around sun" value={planet.orbitalPeriod} onChange={handleInput} required/>

                    <label for="star">Assigned Star</label>
                    <Input type="select" name="select" id="starId" value={planet.star?.name} onChange={handleInput} >
                        <option value={null}>What star does the planet belong too</option>
                        {star.map((s) => {
                            return <option value={s.id}>{s.name}</option>
                            })}
                    </Input>

                    <label for="planetType">Planet Type</label>
                    <Input type="select" name="select" id="planetTypeId" value={planet.planetTypeId} onChange={handleInput} >
                        <option value={null}>Select a planet Type</option>
                        {planetType.map((pt) => {
                            return <option value={pt.id}>{pt.type}</option>
                            })}
                    </Input>
                    
                    <label for="color">Color</label>
                    <Input type="select" name="select" id="colorId" value={planet.colorId} onChange={handleInput} >
                        <option value={null}>Select a color</option>
                        {color.map((c) => {
                            return <option value={c.id}>{c.paint}</option>
                            })}
                    </Input>

                    
                </div>

                    {planetId.id? 
                    <div>
                        <button type="submit" class="btn btn-primary mr-3" onClick={
                            handleUpdatePlanet
                        }>Update</button>

                        <button type="cancel" class="btn btn-primary mx-3" onClick={() => {
                            handleClickCancel()
                        }}>Cancel</button>

                    </div>
                    :
                    <button type="submit" class="btn btn-primary" onClick={() => {
                        handleCreatePlanet()
                    }}>Create</button>
                    }
                </div>
            </div>
        </Container>
    )
}

export default PlanetForm