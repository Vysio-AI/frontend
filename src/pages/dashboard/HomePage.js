import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import VideoPlayer from '../../components/VideoPlayer';

export default function HomePage() {
  const { isLoading } = useAuth0();
  const [videoId, setVideoId] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="h-full w-full">
      <h1 className="text-2xl font-semibold">Video Demo</h1>
      <input
      className="border border-2 border-black rounded-lg px-2 py-1 mx-1"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <button
        className="bg-blue-500 rounded-lg text-white px-2 py-1 font-semibold"
        onClick={() => setCurrentVideo(videoId)}
      >
        Get Video
      </button>
      <VideoPlayer videoId={currentVideo}/>
    </div>
  )
}
