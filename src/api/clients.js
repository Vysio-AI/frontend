const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the clients API provided by api.vysio.ca

const getClient = async (id) => {
    // TODO
}

const getClientProtocols = async (id) => {
    // TODO
}

const getClientSessions = async (id) => {
    // TODO
}

const getClients = async () => {
    // TODO
}

const updateClient = async () => {
    // TODO
}

const deleteClient = async () => {
    // TODO
}


module.exports = {
    getClient,
    getClientProtocols,
    getClientSessions,
    getClients,
    updateClient,
    deleteClient
}