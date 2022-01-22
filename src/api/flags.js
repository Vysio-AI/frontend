const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the flags API provided by api.vysio.ca

const getFlag = async (id) => {
  const response = await fetch(`${BASE_URL}/flags/${id}`);
  return response.json();
}

const getFlags = async () => {

}

const updateFlag = async () => {

}

const deleteFlag = async () => {

}


module.exports = {
  getFlag,
  getFlags,
  updateFlag,
  deleteFlag
}