const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the sessions API provided by api.vysio.ca

const getSession = async (id) => {
  const response = await fetch(`${BASE_URL}/sessions/${id}`);
  return response.json();
}

const getSessions = async () => {

}

const updateSession = async () => {

}

const deleteSession = async () => {

}


module.exports = {
  getSession,
  getSessions,
  updateSession,
  deleteSession
}
