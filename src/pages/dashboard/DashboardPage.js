import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import VideoPlayer from '../../components/VideoPlayer';

// Card components
import DailyCompletionCard from '../../components/dashboard/DailyCompletionCard';
import SessionsCard from '../../components/dashboard/SessionsCard';
import PlansCard from '../../components/dashboard/PlansCard';
import InformationCard from '../../components/dashboard/InformationCard';

import { useQuery } from 'react-query';
import { getClients } from '../../api/clients';

import {
  FolderIcon,
  BellIcon,
} from '@heroicons/react/outline'
import SelectClientDropdown from '../../components/dashboard/SelectClientDropdown';

export default function DashboardPage() {
  const auth0 = useAuth0();
  const [currentClientId, setCurrentClientId] = useState(null)

  const clients = useQuery('clients', () => getClients());

  if (auth0.isLoading || clients.isLoading) {
    return <Loading />
  }

  return (
    <div className="h-full w-full">
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 pl-2 pt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <SelectClientDropdown setCurrentClientId={setCurrentClientId}/>
          <div className="flex flex-row items-center">
            <button
              className="ml-2 p-2 rounded-full bg-slate-50"
              onClick={() => console.log("Folder")}
            >
              <FolderIcon className="h-7 w-7"/>
            </button>
            <button
              className="ml-2 p-2 rounded-full bg-slate-50"
              onClick={() => console.log("Notification")}
            >
              <BellIcon className="h-7 w-7"/>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden h-2/3 2xl:h-3/4 w-full xl:flex xl:flex-row p-4">
        <div className="h-full w-3/5 flex flex-col">
          <div className="flex flex-row h-1/2 min-w-full">
            <div className="h-full w-1/2 p-4">
              <InformationCard currentClientId={currentClientId} />
            </div>
            <div className="h-full w-1/2 p-4">
              <PlansCard currentClientId={currentClientId} />
            </div>
          </div>
          <div className="h-1/2 w-full p-4">
            <SessionsCard currentClientId={currentClientId} />
          </div>
        </div>
        <div className="min-h-full w-2/5 flex flex-col">
          <div className="h-full w-full p-4">
            <DailyCompletionCard currentClientId={currentClientId} />
          </div>
        </div>
      </div>
      <div className="hidden h-full w-full md:flex md:flex-col p-4 xl:hidden">
        <div className="w-full flex flex-row">
          <div className="h-full w-full p-2">
            <DailyCompletionCard currentClientId={currentClientId} />
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/2 p-2">
            <InformationCard currentClientId={currentClientId} />
          </div>
          <div className="w-1/2 p-2">
            <PlansCard currentClientId={currentClientId} />
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="h-full w-full p-2">
            <SessionsCard currentClientId={currentClientId} />
          </div>
        </div>
      </div>
      <div className="h-full w-full flex flex-col p-4 md::hidden">
        <div className="w-full flex flex-row">
          <div className="h-full w-full p-2">
            <DailyCompletionCard currentClientId={currentClientId} />
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-full p-2">
            <InformationCard currentClientId={currentClientId} />
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-full p-2">
            <PlansCard currentClientId={currentClientId} />
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="h-full w-full p-2">
            <SessionsCard currentClientId={currentClientId} />
          </div>
        </div>
      </div>
    </div>
  )
}
