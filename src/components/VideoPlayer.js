import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ReactPlayer from 'react-player';

export default function VideoPlayer({ videoId }) {
  const [url, setUrl] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      })
      const res = await fetch(`http://localhost:3000/api/v1/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const video = await res.json();
      console.log(video);
      setUrl(video.data.readSignedUrl);
    }
    if(videoId != null) {
      fetchData();
    }
  }, [videoId, setUrl, getAccessTokenSilently])

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <ReactPlayer
          url={url}
          controls={true}
        />
      </div>
    </div>
  )
}
