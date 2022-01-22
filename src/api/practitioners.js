const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the practitioners API provided by api.vysio.ca

const getPractitioner = async (id) => {
    // TODO
}

const getPractitioners = async (id) => {
    // TODO
}

const getPractitionerClients = async (id) => {
    // TODO
}

const updatePractitioner = async () => {
    // TODO
}

const deletePractitioner = async () => {
    // TODO
}


module.exports = {
    getPractitioner,
    getPractitioners,
    getPractitionerClients,
    updatePractitioner,
    deletePractitioner
}