import { getRequest, postRequest, patchRequest, delRequest } from './http';

const getSessionNotifications = () => {
  return getRequest('/session-notifications');
}

const getSessionNotification = (sessionId) => {
  return getRequest(`/session-notifications/${sessionId}`);
}

const updateSessionNotification = (sessionId, updateData) => {
  return postRequest(`/session-notifications/${sessionId}`, updateData);
}

export {
  getSessionNotifications,
  getSessionNotification,
  updateSessionNotification,
}
