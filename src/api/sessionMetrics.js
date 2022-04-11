// Module for interacting with the session metrics API provided by api.vysio.ca
import { getRequest } from './http';

const getSessionMetrics = (clientId) => {
    return getRequest(`/metrics/${clientId}`)
}

export {
    getSessionMetrics
}