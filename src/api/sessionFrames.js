const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the session frames API provided by api.vysio.ca

const getSessionFrame = async (id) => {
    fetch(`${BASE_URL}/exercises/${id}`).then(res => res.json());
}

const getSessionFrames = async (sessionId) => {

}

module.exports = {
    getSessionFrame,
    getSessionFrames
}