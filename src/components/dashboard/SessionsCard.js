import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { getPlansForClient, getSessionsForClient } from '../../api/clients';
import { CalendarIcon } from '@heroicons/react/outline'

// Momentjs
import Moment from 'react-moment'
import 'moment-timezone'

export default function SessionsCard({ currentClientId }) {
  const [plansObject, setPlansObject] = useState(null)
  const history = useHistory()

  const plans = useQuery(['plans', currentClientId], () => getPlansForClient(currentClientId))

  const sessions = useQuery(['sessions', currentClientId], () => getSessionsForClient(currentClientId))

  useEffect(() => {
    if (plans.data) {
      var object = plans.data.reduce((obj, item) => (obj[item.id] = item, obj) ,{})
      setPlansObject(object)
    }
  }, [plans.data]);

  console.log(plansObject)

  return (
    <div className="h-full w-full bg-slate-50 rounded-xl shadow-lg outline outline-1 outline-gray-100 flex flex-col items-start justify-start p-4">
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Sessions</h1>
        <button
          className="px-2 py-1 text-base bg-slate-200 rounded-full"
          onClick={() => history.push("/dashboard/sessions")}
        >
          View All
        </button>
      </div>
      <div className="w-full px-2 pt-2 flex flex-col items-center justify-start space-y-1">
        {plansObject && sessions.data && sessions.data?.map((session, idx) => {
          if (idx < 2) {
            return (
              <div key={session.id} className={`relative w-full px-6 py-5 m-2 rounded-lg flex items-center space-x-3 bg-slate-50 hover:bg-gray-100 shadow-lg outline outline-1 outline-gray-100`}>
                <div className="flex-1 min-w-0">
                  <a href={`/dashboard/sessions/${session.id}`} className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-xl font-semibold text-gray-900 pb-2">{plansObject[session.planId]?.name}</p>
                      <Moment className="text-lg" duration={session.startTime} date={session.endTime} />
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <div className="flex flex-row items-center">
                        <CalendarIcon className="w-6 h-6 mr-2"/>
                        <Moment className="text-lg" format="MM/DD/YYYY">{session.endTime}</Moment>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}