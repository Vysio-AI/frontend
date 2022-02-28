import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import PageHeading from "../../components/PageHeading";
import PaginationCardFooter from "../../components/PaginationCardFooter";
import {
  ChevronRightIcon,
  CheckCircleIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getSessions } from '../../api/sessions';
import { getClients } from '../../api/clients';
import { getPlans } from '../../api/plans';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

// Momentjs
import Moment from 'react-moment'
import 'moment-timezone'

const sessions = [
  {
    id: 1,
    patient: {
      id: 1,
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    plan: {
      id: 2,
      name: 'Shoulder Mobility Training',
    },
    date: '2022-01-08',
    dateFull: 'January 8, 2022',
    notes: true,
  },
  {
    id: 2,
    patient: {
      id: 1,
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    plan: {
      id: 1,
      name: 'Shoulder Strength Training',
    },
    date: '2022-01-07',
    dateFull: 'January 7, 2022',
    notes: false,
  },
]

function SessionNotesAnnotation(props) {
  const isNotes = props.notes

  if (isNotes) {
    return (
      <p className="mt-2 flex items-center text-sm text-gray-400">
        <AnnotationIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-indigo-500" aria-hidden="true" />
        Patient left notes
      </p>
    )
  } else {
    return (
      <p className="mt-2 flex items-center text-sm text-gray-400">
        No patient notes
      </p>
    )
  }
}


export default function SessionsPage() {
  const { isLoading } = useAuth0();
  const history = useHistory();
  const [plansObject, setPlansObject] = useState(null)
  const [clientsObject, setClientsObject] = useState(null)

  const sessionsQuery = useQuery('sessions', () => getSessions())

  const plansQuery = useQuery('plans', () => getPlans())

  const clientsQuery = useQuery('clients', () => getClients())

  useEffect(() => {
    if (plansQuery.data) {
      var object = plansQuery.data.reduce((obj, item) => (obj[item.id] = item, obj) ,{})
      setPlansObject(object)
    }
  }, [plansQuery.data]);

  useEffect(() => {
    if (clientsQuery.data) {
      var object = clientsQuery.data.reduce((obj, item) => (obj[item.id] = item, obj) ,{})
      setClientsObject(object)
    }
  }, [clientsQuery.data]);

  if (isLoading || sessionsQuery.isLoading || plansQuery.isLoading || clientsQuery.isLoading) {
    return <Loading />
  }
  
  return (
    <div>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h1 className="text-3xl font-bold leading-6 text-gray-900">Sessions</h1>
          </div>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {sessionsQuery.data && clientsObject && plansObject && sessionsQuery.data.map((session) => (
            <li key={session.id}>
              <a 
                className="block hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => {
                  history.push(`/dashboard/sessions/${session.id}`)
                }}
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src={clientsObject[session.clientId]?.imageUrl} alt="" />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-base font-medium text-black truncate">{clientsObject[session.clientId]?.firstName} {clientsObject[session.clientId]?.lastName}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="truncate">{plansObject[session.planId]?.name}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-base text-gray-400">
                            <Moment format="DD/MM/YYYY HH:mm" trim>{session.endTime}</Moment>
                          </p>
                          <SessionNotesAnnotation notes={session?.clientNotes} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <PaginationCardFooter start={1} end={1} total={1} pageNum={1} pageCount={1}/>
      </div>
    </div>
  )
}
