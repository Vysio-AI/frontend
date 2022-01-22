const { getAccessTokenSilently } = useAuth0();
const BASE_URL = process.env.API_BASE_URL;

// Module for interacting with the videos API provided by api.vysio.ca

const getVideo = async (videoId, token) => {
  
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
  getVideo
}
