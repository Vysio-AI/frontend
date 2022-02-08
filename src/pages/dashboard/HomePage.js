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
      <h1 className="font-bold text-2xl">Dashboard</h1>
    </div>
  )
}
