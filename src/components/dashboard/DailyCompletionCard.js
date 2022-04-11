import { getSessionMetrics } from "../../api/sessionMetrics";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPlansForClient } from '../../api/clients';
import ActivityDoughnutChart from "../ActivityDoughnutChart";

export default function DailyCompletionCard({ currentClientId }) {
  const [sessionMetricsObjects, setSessionMetricsObjects] = useState(null);

  const plans = useQuery(['plans', currentClientId], () => getPlansForClient(currentClientId))

  const sessionMetrics = useQuery(['client-session-metrics', currentClientId], () => getSessionMetrics(currentClientId));

  console.log(sessionMetrics)

  if (sessionMetricsObjects == null && sessionMetrics.data && sessionMetrics.data.length > 0 && plans.data) {
    let parsedMetricsObjects = sessionMetrics.data.map((metric) => {
      let parsedJsonData = JSON.parse(metric.data)
      let plan = plans.data.find(plan => plan.id == metric.planId);
      return {
        ...metric,
        data: parsedJsonData,
        planName: plan.name,
        planTimeframe: plan.timeframe,
        planRepetitions: plan.repetitions
      }
    })
    setSessionMetricsObjects(parsedMetricsObjects)
  }

  console.log(sessionMetricsObjects);
  console.log(plans)

  return (
    <div className="h-full w-full bg-slate-50 rounded-xl shadow-lg outline outline-1 outline-gray-100 flex flex-col items-start justify-start p-4">
      <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">Metrics</h1>
      { sessionMetricsObjects && sessionMetricsObjects.map((metricsObject) => (
        <div className="flex flex-col w-full px-6 py-5 m-2 rounded-lg flex items-start space-x-3 bg-slate-50 shadow-lg outline outline-1 outline-gray-100">
          <p className="text-xl font-semibold">{metricsObject.planName}</p>
          <p className="text-lg lowercase">{metricsObject.planRepetitions}x {metricsObject.planTimeframe}</p>
          <div className="w-full flex flex-row flex-wrap items-center">
            { Object.keys(metricsObject.data).map((key) => {
              return <div className="flex flex-col items-center">
                <ActivityDoughnutChart progress={metricsObject.data[key].completed} target={metricsObject.data[key].required}/>
                <p>{key}</p>
              </div>
            })
            }
          </div>
        </div>
        ))
      }
    </div>
  )
}