import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import PlanList from "../../components/PlanList";
import PlanView from "../../components/PlanView";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { createPlan, getPlans } from '../../api/plans';

export default function PlansPage() {
  const { isLoading } = useAuth0();
  const { planId : paramPlanId } = useParams();
  const [showDirectory, setShowDirectory] = useState(true);
  const [planId, setPlanId] = useState(paramPlanId);

  const queryClient = useQueryClient();

  const plans = useQuery('plans', getPlans);

  const createDefaultPlan = useMutation(() => createPlan("Default", 2, "WEEKLY"), {
    onSuccess: () => {
      return queryClient.invalidateQueries('plans')
    },
  })

  const setShowPlan = (planId) => {
    setPlanId(planId);
    setShowDirectory(false);
  }

  useEffect(() => {
    if (planId) {
      setShowDirectory(false)
    }
  }, [planId])

  if (plans.isLoading || isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 pl-2 pt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <h1 className="text-3xl font-bold leading-6 text-gray-900">Plans</h1>
          <div className="flex flex-row">
            <button
              className="px-3 py-2 bg-blue-400 rounded-lg text-white font-semibold"
              onClick={() => createDefaultPlan.mutate()}
            >
              + Create Plan
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-full flex overflow-hidden bg-white">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            {showDirectory &&
              <div className="xl:hidden order-first flex flex-col flex-shrink-0 w-96 border-r border-gray-200">
                <PlanList plans={plans.data} setShowPlan={setShowPlan} currentlySelected={planId} />
              </div>
            }
            {!showDirectory &&
              <PlanView planId={planId} setShowDirectory={setShowDirectory} setPlanId={setPlanId}/>
            }
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              <PlanList plans={plans.data} setShowPlan={setShowPlan} currentlySelected={planId} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
