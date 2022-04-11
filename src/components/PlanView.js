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

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPlan, updatePlan } from '../api/plans';

import AddExerciseModal from "./AddExerciseModal";
import DeletePlanModal from "./DeletePlanModal";
import DeleteExerciseFromPlanModal from "./DeleteExerciseFromPlanModal";
import AddPatientDropdown from './AddPatientDropdown';
import EditClientsModal from './EditClientsModal';
import EditPlanRepetitionsDropdown from './EditPlanRepetitionsDropdown';

export default function PlanView({ planId, setPlanId, setShowDirectory }) {

  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false)
  const [editClientsModalOpen, setEditClientsModalOpen] = useState(false)
  const [deletePlanModalOpen, setDeletePlanModalOpen] = useState(false)
  const [exerciseToDelete, setExerciseToDelete] = useState(null)
  const [deleteExerciseFromPlanModalOpen, setDeleteExerciseFromPlanModalOpen] = useState(false)

  // Edit state
  const [editMode, setEditMode] = useState(null);
  const [editName, setEditName] = useState(null);
  const [editDuration, setEditDuration] = useState(null);
  const [editTimeframe, setEditTimeframe] = useState(null);

  const queryClient = useQueryClient();

  const plan = useQuery(['plan', planId], () => getPlan(planId));

  const editPlan = useMutation((updateData) => updatePlan(planId, updateData), {
    onSuccess: () => {
      queryClient.invalidateQueries(['plan', planId])
      return queryClient.invalidateQueries('plans')
    },
  })

  const handleUpdateName = () => {
    setEditMode(null)
    if (editName != plan.data.name) {
      editPlan.mutate({
        name: editName.trim()
      })
    }
  }

  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      handleUpdateName()
    }
  }

  if (plan.isError || plan.isLoading) {
    return <div></div>
  }

  if (plan.data && !editMode) {
    if (editName != plan.data.name) {
      setEditName(plan.data.name)
    }
    if (editDuration != plan.data.duration) {
      setEditDuration(plan.data.duration)
    }
    if (editTimeframe != plan.data.timeframe) {
      setEditTimeframe(plan.data.timeframe)
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg min-w-full xl:pr-96">
      <div className="mt-6 justify-between py-4 px-4 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:space-x-6 sm:pb-1">
        { !(editMode == "name") &&
          <h1 
            className="text-2xl font-bold text-gray-900 truncate"
            onClick={() => setEditMode("name")}
          >{plan.data.name}</h1>
        }
        { editMode == "name" &&
            <input
              className="text-2xl font-bold text-gray-900 truncate border-1 border-b focus:outline-none"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleUpdateName}
              autoFocus={true}
            />
        }
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
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-row items-center justify-between">
              <div>
                { plan.data.clients.map(_client => <img key={_client.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={_client.imageUrl} alt=""/>)}
                <AddPatientDropdown planId={plan.data.id} />
              </div>
              <button
                onClick={() => setEditClientsModalOpen(true)}
                className="p-1"
              >
                <PencilIcon className="w-5 h-5"/>
              </button>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 inline-flex items-center">
              <CalendarIcon className="text-sm h-5 w-5 mr-2" />
              Frequency
            </dt>
            <EditPlanRepetitionsDropdown planId={plan.data.id}/>
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
          <PlusCircleIcon className="h-5 w-5 text-blue-400 hover:text-blue-600" aria-hidden="true" />
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
                          className="p-1"
                        >
                          <PencilIcon className="h-5 w-5 text-gray-500 hover:text-indigo-500" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="p-1"
                          onClick={() => {
                            setExerciseToDelete(exercise.id)
                            setDeleteExerciseFromPlanModalOpen(true)
                          }}
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
      <DeleteExerciseFromPlanModal
        open={deleteExerciseFromPlanModalOpen}
        setOpen={setDeleteExerciseFromPlanModalOpen}
        exerciseId={exerciseToDelete}
        setExerciseToDelete={setExerciseToDelete}
        planId={planId}
      />
      <EditClientsModal open={editClientsModalOpen} setOpen={setEditClientsModalOpen} planId={planId} />
    </div>
  )
}
