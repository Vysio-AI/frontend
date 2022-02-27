// Module for interacting with the sessions API provided by api.vysio.ca
import { getRequest, postRequest, patchRequest, delRequest } from './http';

const getSession = (sessionId) => {
  return getRequest(`/sessions/${sessionId}`);
}

const getSessions = () => {
  return getRequest(`/sessions`);
}

const updateSession = (sessionId, updateData) => {
  console.log(updateData)
  return patchRequest(`/sessions/${sessionId}`, updateData);
}

const deleteSession = (sessionId) => {
  return delRequest(`/sessions/${sessionId}`);
}


export {
  getSession,
  getSessions,
  updateSession,
  deleteSession
}
