import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getToken } from './authManager';

const _apiUrl = "/api/star";

export const getStars = () => {
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

export const getStarsById = (id) => {
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

export const updateStar = (star) => {
    return getToken()
    .then((token) => 
        fetch(_apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(star),
        })
    );
}

export const deleteStar = (star) => {
    return getToken()
    .then((token) => 
        fetch(`${_apiUrl}/${star.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
}

export const addStar = (star) => {
    return getToken()
    .then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(star),
        })
        .then(getStars())
    );
}