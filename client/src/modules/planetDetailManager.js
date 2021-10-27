import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getToken } from './authManager';

const _apiUrl = "/api/planetDetail"

export const getPlanetDetails = () => {
    return fetch(_apiUrl)
    .then(res => res.json())
}

export const getPlanetDetailsByPlanetId = (id) => {
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

export const updatePlanetDetail = (detail) => {
    return getToken()
    .then((token) => 
        fetch(_apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(detail),
        })
    );
}

export const deletePlanetDetail = (planetDetail) => {
    return getToken()
    .then((token) => 
        fetch(`${_apiUrl}/${planetDetail.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
}

export const addPlanetDetail = (planetDetail) => {
    return getToken()
    .then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(planetDetail),
        })
        .then(getPlanetDetails())
    );
}