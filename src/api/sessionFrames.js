// Module for interacting with the session frames API provided by api.vysio.ca

const getSessionFrame = (id) => {
    fetch(`${BASE_URL}/exercises/${id}`).then(res => res.json());
}

const getSessionFrames = (sessionId) => {

}

module.exports = {
    getSessionFrame,
    getSessionFrames
}