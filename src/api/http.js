const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

const getAccessToken = async () => {
    const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
    return accessToken;
}

const postRequest = async (url, data = {}) => {
    const token = getAccessToken();
    const fullUrl = BASE_URL + url;
    return fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
}

const getRequest = async (url) => {
    const token = getAccessToken();
    const fullUrl = BASE_URL + url;
    return fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json());
}

const delRequest = async (url) => {
    const token = getAccessToken();
    const fullUrl = BASE_URL + url;
    return fetch(fullUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json());
}

const patchRequest = async (url, data = {}) => {
    const token = getAccessToken();
    const fullUrl = BASE_URL + url;
    return fetch(fullUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
}

module.exports = {
    postRequest,
    getRequest,
    delRequest,
    patchRequest
}