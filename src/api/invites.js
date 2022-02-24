// Module for interacting with the invites API provided by api.vysio.ca
import { getRequest, patchRequest, postRequest } from './http';

const getInvites = () => {
    return getRequest(`/invites`);
}

const createInvite = (clientEmail, clientFirstName, clientLastName) => {
    // Default expiry 7 days
    const defaultExpiry = new Date().setDate(new Date().getDate() + 7);
    return postRequest(`/invites`, {
        clientEmail: clientEmail,
        clientFirstName: clientFirstName,
        clientLastName: clientLastName,
        expiry: defaultExpiry
    });
}

const updateInvite = (inviteId, updateBody) => {
    return patchRequest(`/invites/${inviteId}`, updateBody);
}

export {
    getInvites,
    createInvite,
    updateInvite
}