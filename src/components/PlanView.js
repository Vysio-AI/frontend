import React, { useState } from 'react';
import {
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  InformationCircleIcon,
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  PlusSmIcon,
} from '@heroicons/react/outline'

import { useQuery } from 'react-query';
import { getPlan } from '../api/plans';

import AddExerciseModal from "./AddExerciseModal";
import DeletePlanModal from "./DeletePlanModal";
import DeleteExerciseFromPlanModal from "./DeleteExerciseFromPlanModal";

export default function PlanView({ planId, setPlanId, setShowDirectory }) {

  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false)
  const [deletePlanModalOpen, setDeletePlanModalOpen] = useState(false)
  const [deleteExerciseFromPlanModalOpen, setDeleteExerciseFromPlanModalOpen] = useState(false)

  const plan = useQuery(['plan', planId], () => getPlan(planId));

  if (plan.isError || plan.isLoading) {
    return <div></div>
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg min-w-full xl:pr-96">
      <div className="mt-6 justify-between py-4 px-4 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:space-x-6 sm:pb-1">
        <h1 className="text-2xl font-bold text-gray-900 truncate">{plan.data.name}</h1>
        <button
          type="button"
          className="inline-flex justify-center shadow-sm text-sm font-medium rounded-md bg-white"
          onClick={() => setDeletePlanModalOpen(true)}
        >
          <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500 hover:text-red-500" aria-hidden="true" />
        </button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 inline-flex items-center">
              <UserGroupIcon className="text-sm h-5 w-5 mr-2" />
              People
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              { plan.data.clients.map(_client => <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={_client.imgUrl} alt=""/>)}
              <button
                type="button"
                className="flex-shrink-0 bg-white inline-block h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {}}
              >
                <span className="sr-only">Add team member</span>
                <PlusSmIcon className="inline-block h-5 w-5 rounded-full" aria-hidden="true" />
              </button>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 inline-flex items-center">
              <CalendarIcon className="text-sm h-5 w-5 mr-2" />
              Frequency
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{plan.data.repetitions}x {plan.data.timeframe?.toLowerCase()}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 inline-flex items-center">
              <ClockIcon className="text-sm h-5 w-5 mr-2" />
              Length
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {(plan.data.exercises.map(i=>i.duration)?.reduce((a,b) => a+b, 0) / 60).toFixed(2)} Minutes
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 inline-flex items-center">
              <InformationCircleIcon className="text-sm h-5 w-5 mr-2" />
              Exercise Count
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {plan.data.exercises.duration} Exercises
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-row justify-between items-center py-4 px-4">
        <h3 className="ml-2 text-lg font-medium text-gray-900">Exercises</h3>
        <button
          type="button"
          className="inline-flex justify-center text-sm font-medium rounded-md bg-white"
          onClick={() => setAddExerciseModalOpen(true)}
        >
          <PlusCircleIcon className="h-5 w-5 text-indigo-600 hover:text-indigo-500" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Focus Area
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Notes
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plan.data.exercises.map((exercise, exerciseIdx) => (
                    <tr key={exercise.id} className={exerciseIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        <a href="#" className="hover:text-indigo-500">{exercise.activityType}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Shoulder</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.duration} Seconds</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.notes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-sm">
                        <button
                          type="button"
                          className="inline-flex justify-center shadow-sm text-sm font-medium rounded-md bg-white"
                        >
                          <PencilIcon className="h-5 w-5 text-gray-500 hover:text-indigo-500" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center shadow-sm text-sm font-medium rounded-md bg-white"
                          onClick={() => setDeleteExerciseFromPlanModalOpen(true)}
                        >
                          <TrashIcon className="ml-2 h-5 w-5 text-gray-500 hover:text-red-500" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddExerciseModal open={addExerciseModalOpen} setOpen={setAddExerciseModalOpen} planId={planId} />
      <DeletePlanModal open={deletePlanModalOpen} setOpen={setDeletePlanModalOpen} plan={plan.data} setPlanId={setPlanId}/>
      <DeleteExerciseFromPlanModal open={deleteExerciseFromPlanModalOpen} setOpen={setDeleteExerciseFromPlanModalOpen}/>
    </div>
  )
}
