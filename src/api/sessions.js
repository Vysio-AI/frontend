const BASE_URL = process.env.API_BASE_URL;

const fetchSessionById = async (id) => {
  const response = await fetch(BASE_URL + '/sessions/' + id);
  return response.json();
}


module.exports = {
  
}
