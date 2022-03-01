import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPlansForClient } from '../../api/clients';
import { ClockIcon } from '@heroicons/react/outline'
import { ReactComponent as BicepSvg } from '../svg/flexed-bicep.svg'
import { useHistory } from 'react-router-dom';

export default function PlansCard({ currentClientId }) {
  const history = useHistory()

  const plans = useQuery(['plans', currentClientId], () => getPlansForClient(currentClientId))

  return (
    <div className="h-full w-full bg-slate-50 rounded-xl shadow-lg outline outline-1 outline-gray-100 flex flex-col items-start justify-start p-4">
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">Plans</h1>
        <button
          className="px-2 py-1 text-xs xl:text-sm 2xl:text-base bg-slate-200 rounded-lg"
          onClick={() => history.push("/dashboard/plans")}
        >
          View All
        </button>
      </div>
      <div className="w-full px-2 pt-2 flex flex-col items-center justify-start space-y-1">
        {plans.data && plans.data?.map((plan, idx) => {
          if (idx < 2) {
            return (
              <div key={plan.id} className={`relative w-full px-6 py-5 m-2 rounded-lg flex items-center space-x-3 bg-slate-50 hover:bg-gray-100 shadow-lg outline outline-1 outline-gray-100`}>
                <div className="flex-1 min-w-0">
                  <a href={`/dashboard/plans/${plan.id}`} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-base xl:text-lg 2xl:text-xl font-semibold text-gray-900 pb-2">{plan.name}</p>
                      <div className="flex flex-row w-full justify-between items-center">
                        <div className="flex -space-x-1 overflow-hidden h-6">
                          {plan.clients.map(_client => <img key={_client.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={_client.imageUrl} alt=""/>)}
                        </div>
                        <div className="flex flex-row items-center">
                        <BicepSvg className="w-4 h-4 xl:w-5 xl:h-5 pr-1"/>
                        <p className="pr-1 text-xs lg:text-sm text-gray-400">
                          {plan.exercises.length} Exercises
                        </p>
                        <ClockIcon className="w-4 h-4 xl:w-5 xl:h-5 pr-1"/>
                        <p className="text-xs lg:text-sm text-gray-400">
                          {(plan.exercises.map(i=>i.duration)?.reduce((a,b) => a+b, 0) / 60).toFixed(1)} min
                        </p>
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