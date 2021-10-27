import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getToken } from './authManager';

const _apiUrl = "/api/planet";

export const getPlanets = () => {
    return getToken()
        .then(
            (token) =>
            fetch(_apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
        );
}

export const getPlanetsById = (id) => {
    return getToken()
    .then((token) =>
        fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
    );    
}

export const updatePlanet = (planet) => {
    return getToken()
    .then((token) => 
        fetch(_apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(planet),
        })
    );
}

export const deletePlanet = (planet) => {
    return getToken()
    .then((token) => 
        fetch(`${_apiUrl}/${planet.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
}

export const addPlanet = (planet) => {
    return getToken()
    .then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(planet),
        })
        .then(getPlanets())
    );
}
