const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchVideoById = async (videoId, token) => {
  
  const response = await fetch(BASE_URL + `/videos/${videoId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    console.log(response.json());
    throw new Error('Response not ok');
  }
  return response.json();
}

module.exports = {
  fetchVideoById
}
