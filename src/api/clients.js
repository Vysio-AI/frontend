// Module for interacting with the clients API provided by api.vysio.ca
import { delRequest, getRequest, patchRequest, postRequest } from './http';

const getClient = (clientId) => {
    return getRequest(`/clients/${clientId}`);
}

const getClients = (limit, offset) => {
    return getRequest(`/clients?limit=${limit}&offset=${offset}`);
}

const updateClient = (clientId, updateData) => {
    return patchRequest(`/clients/${clientId}`, updateData);
}

const deleteClient = (clientId) => {
    return delRequest(`/clients/${clientId}`);
}

export {
    getClient,
    getClients,
    updateClient,
    deleteClient
}