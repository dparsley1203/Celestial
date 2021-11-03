//Not used

// import React from "react";
// import { useEffect, useState } from "react";
// import { Container, Input } from "reactstrap";
// import { useHistory, useParams } from "react-router"
// import { addPlanetDetail, updatePlanetDetail } from "../modules/planetDetailManager";
// import { getPlanets, getPlanetsById } from "../modules/planetManager";


// const PlanetDetailForm = () => {
    
//     const [ planet, setPlanet ] = useState([])
//     const [ planetDetail, setPlanetDetail ] = useState({
//         planetId: "",
//         notes: "",
//     })
    
//     const history = useHistory();
//     const {id}  = useParams();

//     useEffect(() => {
//         getPlanetsById(id)
//         .then(planet => setPlanet(planet))
//     }, [])

//     const handleInput = (event) => {
//         const newPlanetDetail = {...planetDetail}
//         newPlanetDetail[event.target.id] = event.target.value
//         setPlanetDetail(newPlanetDetail)
//     }

//     const handleCreatePlanetDetail = () => {

//         const newPlanetDetail = {
            
//             planetId: id, // used params to get number from browser in order to save planetId to the message/detail I was looking at
//             notes: planetDetail.notes
//         }
        
//         addPlanetDetail(newPlanetDetail)
//         .then(() => history.push(`/planet/${id}`))
        
//     }

//     return (
//         <Container>
//             <div className="planetDetailForm">
//                 <h3>Add a Comment</h3>
//                 <div className="container-5">
//                 <div className ="form-group">
//                     <label for="name">Name</label>
//                     <Input type="textarea" class="form-control" id="notes" placeholder ="notes" value={planetDetail.notes} onChange={handleInput} required/>
 
//                 </div>
//                     <button type="submit" class="btn btn-primary" onClick={
//                         handleCreatePlanetDetail
//                     }>Add</button>
//                   {/* } */}
//                 </div>
//             </div>
//         </Container>
//     )

// }

// export default PlanetDetailForm;