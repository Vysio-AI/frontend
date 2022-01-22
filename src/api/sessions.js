// Module for interacting with the sessions API provided by api.vysio.ca

const getSession = (id) => {
  const response = await fetch(`${BASE_URL}/sessions/${id}`);
  return response.json();
}

const getSessions = () => {

}

const updateSession = () => {

}

const deleteSession = () => {

}


module.exports = {
  getSession,
  getSessions,
  updateSession,
  deleteSession
}
