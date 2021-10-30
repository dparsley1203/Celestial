const _apiUrl = "/api/moonType"

export const moonTypes = () => {
    return fetch(_apiUrl)
    .then(res => res.json())
}