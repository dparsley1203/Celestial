import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getToken } from './authManager';

const _apiUrl = "/api/moonDetail"

export const getMoonDetails = () => {
    return fetch(_apiUrl)
    .then(res => res.json())
}

export const getMoonDetailsByMoonId = (id) => {
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

export const updateMoonDetail = (detail) => {
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

export const deleteMoonDetail = (moonDetail) => {
    return getToken()
    .then((token) => 
        fetch(`${_apiUrl}/${moonDetail.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
}

export const addMoonDetail = (moonDetail) => {
    return getToken()
    .then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(moonDetail),
        })
        .then(getMoonDetails())
    );
}