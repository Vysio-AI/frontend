import SocketComponent from '../../components/SocketComponent';
import ActivityHeatMap from '../../components/ActivityHeatMap';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }

  console.log(user);

  return (
    <div className="h-full w-full">
      <div className="max-w-lg max-h-lg">
        <ActivityHeatMap />
      </div>
      <SocketComponent />
    </div>
  )
}