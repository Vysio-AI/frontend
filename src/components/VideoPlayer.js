import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ReactPlayer from 'react-player';
import { getVideo } from '../api/videos';
import { useQuery } from 'react-query';

export default function VideoPlayer({ videoId }) {

  const video = useQuery(['video', videoId], () => getVideo(videoId));

  if (video.isLoading) {
    return <span>Loading...</span>
  }

  if (video.isError) {
    return <span>Error: {video.error.message}</span>
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <ReactPlayer
          url={video.data.readSignedUrl}
          controls={true}
        />
      </div>
    </div>
  )
}
