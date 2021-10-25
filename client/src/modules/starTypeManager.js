const _apiUrl = "/api/starType"

export const starTypes = () => {
    return fetch(_apiUrl)
    .then(res => res.json())
}