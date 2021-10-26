import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getToken } from './authManager';

const _apiUrl = "/api/starDetail"

export const getStarDetails = () => {
    return fetch(_apiUrl)
    .then(res => res.json())
}

export const getStarDetailsByStarId = (id) => {
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

export const updateStarDetail = (detail) => {
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

export const deleteStarDetail = (starDetail) => {
    return getToken()
    .then((token) => 
        fetch(`${_apiUrl}/${starDetail.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
}

export const addStarDetail = (starDetail) => {
    return getToken()
    .then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(starDetail),
        })
        .then(getStarDetails())
    );
}