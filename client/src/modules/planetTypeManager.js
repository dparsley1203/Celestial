const _apiUrl = "/api/planetType"

export const planetTypes = () => {
    return fetch(_apiUrl)
    .then(res => res.json())
}