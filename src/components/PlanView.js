import React, { useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/outline'
import { PlusCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

import AddExerciseModal from "./AddExerciseModal";
import DeletePlanModal from "./DeletePlanModal";

export default function PlanView({ plan, setShowDirectory }) {

  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false)
  const [deletePlanModalOpen, setDeletePlanModalOpen] = useState(false)

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg min-w-full xl:pr-96">
      <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
        <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate ml-4">{plan.name}</h1>
        </div>
        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md bg-white"
            onClick={() => setDeletePlanModalOpen(true)}
          >
            <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500 hover:text-red-500" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">People</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {plan.patients.map(_patient => <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={_patient.imgUrl} alt=""/>)}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Frequency</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{plan.frequency}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Length</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {plan.exercises.map(i=>i.length).reduce((a,b) =>a+b)} Seconds
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Exercise Count</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {plan.exercises.length}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-row justify-between items-center px-2 py-2">
        <h3 className="ml-2 text-lg font-medium text-gray-900">Exercises</h3>
        <button
          type="button"
          className="inline-flex justify-center text-sm font-medium rounded-md bg-white"
          onClick={() => setAddExerciseModalOpen(true)}
        >
          <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5 text-indigo-600 hover:text-indigo-500" aria-hidden="true" />
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
                      Length
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
                  {plan.exercises.map((exercise, exerciseIdx) => (
                    <tr key={exercise.id} className={exerciseIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        <a href="#" className="hover:text-indigo-500">{exercise.name}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.focus_area}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.notes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-sm">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md bg-white"
                        >
                          <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500 hover:text-indigo-500" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md bg-white"
                        >
                          <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500 hover:text-red-500" aria-hidden="true" />
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
      <AddExerciseModal open={addExerciseModalOpen} setOpen={setAddExerciseModalOpen}/>
      <DeletePlanModal open={deletePlanModalOpen} setOpen={setDeletePlanModalOpen}/>
    </div>
  )
}
