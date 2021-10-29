import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import { getToken } from './authManager';

const _apiUrl = "/api/moon"

export const getAllMoonsByUserId = () => {
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

export const getMoonssById = (id) => {
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

export const updateMoon = (moon) => {
    return getToken()
    .then((token) => 
        fetch(_apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(moon),
        })
    );
}

export const deleteMoon = (moon) => {
    return getToken()
    .then((token) => 
        fetch(`${_apiUrl}/${moon.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    );
}

export const addMoon = (moon) => {
    return getToken()
    .then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(moon),
        })
        .then(getAllMoonsByUserId ())
    );
}