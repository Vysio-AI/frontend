// Module for interacting with the flags API provided by api.vysio.ca

const getFlag = (id) => {
  const response = await fetch(`${BASE_URL}/flags/${id}`);
  return response.json();
}

const getFlags = () => {

}

const updateFlag = () => {

}

const deleteFlag = () => {

}


module.exports = {
  getFlag,
  getFlags,
  updateFlag,
  deleteFlag
}