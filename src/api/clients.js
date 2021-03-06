// Module for interacting with the clients API provided by api.vysio.ca
import { delRequest, getRequest, patchRequest, postRequest } from './http';

const getClient = (clientId) => {
    return getRequest(`/clients/${clientId}`);
}

const getClients = () => {
    return getRequest(`/clients`);
}

const updateClient = (clientId, updateData) => {
    return patchRequest(`/clients/${clientId}`, updateData);
}

const deleteClient = (clientId) => {
    return delRequest(`/clients/${clientId}`);
}

const getSessionsForClient = (clientId) => {
    return getRequest(`/clients/${clientId}/sessions`)
}

const getPlansForClient = (clientId) => {
    return getRequest(`/clients/${clientId}/plans`)
}

export {
    getClient,
    getClients,
    updateClient,
    deleteClient,
    getSessionsForClient,
    getPlansForClient
}