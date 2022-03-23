import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  PlusIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import SelectClientDropdown from '../../components/dashboard/SelectClientDropdown';
import NotificationsDropdown from '../../components/NotificationsDropdown';

export default function DashboardPage() {
  const auth0 = useAuth0();
  const [currentClientId, setCurrentClientId] = useState(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const clients = useQuery('clients', () => getClients());

  const history = useHistory();

  if (auth0.isLoading || clients.isLoading) {
    return <Loading />
  }

  return (
    <>
      { !clients.isLoading && clients.data && clients.data.length > 0 &&
        <div className="h-full w-full">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 pl-2 pt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <SelectClientDropdown setCurrentClientId={setCurrentClientId}/>
              <div className="flex flex-row items-center">
                <NotificationsDropdown />
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
          <div className="h-full w-full flex flex-col p-4 xl:hidden">
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
        </div>
      }
      { !clients.isLoading && clients.data && clients.data.length == 0 &&
        <div className="h-full w-full">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-2 pl-2 pt-2 flex items-center justify-end flex-wrap sm:flex-nowrap">
              <div className="flex flex-row items-center">
                <NotificationsDropdown />
              </div>
            </div>
          </div>
          <div className="h-2/3 2xl:h-3/4 items-center justify-center w-full flex flex-row p-4">
            <div className="text-center">
              <div className="w-full flex flex-row items-center justify-center" >
                <UsersIcon className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No clients</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by inviting a new client.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => history.push('/dashboard/patients', {invitePatientModalOpen: true})}
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Invite Client
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
