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
    const response = fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const getRequest = async (url) => {
    const token = getAccessToken();
    const fullUrl = BASE_URL + url;
    const response = fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const delRequest = async (url) => {
    const token = getAccessToken();
    const fullUrl = BASE_URL + url;
    const response = fetch(fullUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const patchRequest = async (url, data = {}) => {
    const token = getAccessToken();
    const fullUrl = BASE_URL + url;
    const response = fetch(fullUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

module.exports = {
    postRequest,
    getRequest,
    delRequest,
    patchRequest
}