const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the organizations API provided by api.vysio.ca

const getOrganization = async (id) => {
    // TODO
}

const getOrganizationPractitioners = async () => {
    // TODO
}

const getOrganizations = async () => {
    // TODO
}

const updateOrganization = async () => {
    // TODO
}

const deleteOrganization = async () => {
    // TODO
}


module.exports = {
    getOrganization,
    getOrganizations,
    getOrganizationPractitioners,
    updateOrganization,
    deleteOrganization
}