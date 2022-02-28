import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import ReactPlayer from 'react-player';
import { getVideo } from '../api/videos';
import { useQuery } from 'react-query';

export default function VideoPlayer({ videoId, width, height }) {

  const video = useQuery(['video', videoId], () => getVideo(videoId));

  if (videoId && video.isLoading) {
    return <span>Loading...</span>
  }

  if (video.isError || !videoId) {
    return (
      <ReactPlayer
        url={new MediaStream()}
        controls={true}
        width={width}
        height={height}
      />
    )
  }

  return (
    <ReactPlayer
      url={video.data.readSignedUrl}
      controls={true}
      width={width}
      height={height}
    />
  )
}
