import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {
  PlusSmIcon,
} from '@heroicons/react/outline'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getClients } from '../api/clients';
import { updatePlan, getPlan } from '../api/plans';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TIMEFRAMES = ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"]
const TIMEFRAME_INDEX = {
  "DAILY": 0,
  "WEEKLY": 1,
  "BIWEEKLY": 2,
  "MONTHLY": 3
}

export default function AddPatientDropdown({ planId }) {
  const [editTimeframe, setEditTimeframe] = useState(null)
  const [editRepetitions, setEditRepetitions] = useState(null)

  const plan = useQuery(['plan', planId], () => getPlan(planId));

  const queryClient = useQueryClient()

  // Set intiial values for timeframe and repetitions
  useEffect(() => {
    if (plan.data) {
      if (editRepetitions !== plan.data.repetitions) {
        setEditRepetitions(plan.data.repetitions)
      }
      if (editTimeframe !== plan.data.timeframe) {
        setEditTimeframe(plan.data.timeframe)
      }
    }
  }, [plan.data])

  const editPlanMutation = useMutation(({ id, updateData }) => updatePlan(id, updateData), {
    onSuccess: () => {
      return queryClient.invalidateQueries(['plan', planId])
    },
  });

  const handleUpdate = () => {
    if (editTimeframe !== plan.data.timeframe || editRepetitions !== plan.data.repetitions) {
      editPlanMutation.mutate({
        id: planId,
        updateData: {
          timeframe: editTimeframe,
          repetitions: editRepetitions
        }
      })
    }
  }

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
      onBlur={() => {
        handleUpdate()
        setEditTimeframe(plan?.data?.timeframe)
        setEditRepetitions(plan?.data?.repetitions)
      }}
    >
      <div>
        <Menu.Button className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
          {plan.data?.repetitions}x {plan.data?.timeframe?.toLowerCase()}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
            { plan.isLoading || editPlanMutation.isLoading &&
              <div className="flex flex-col items-center justify-between">
                <span className="text-indigo-600 mx-auto pt-4">
                  <FontAwesomeIcon icon={faCircleNotch} size='2x' spin />
                </span>
              </div>
            }
            { plan.data && !plan.isLoading && !editPlanMutation.isLoading &&
              <div className="flex flex-col p-2 space-y-3">
                <div className="flex flex-row items-center justify-between">
                  <div className="text-sm font-semibold items-center justify-between">Repetitions</div>
                  <div className="w-full flex flex-row items-center justify-between border border-1 rounded-lg ml-4">
                    <button
                      className="text-xl pl-2"
                      onClick={() => {
                        if (editRepetitions > 1) {
                          setEditRepetitions(editRepetitions - 1)
                        }
                      }}
                    >-</button>
                    <button
                      disabled={true}
                      className="text-base"
                    >
                      {editRepetitions}x
                    </button>
                    <button
                      className="text-xl pr-2"
                      onClick={() => setEditRepetitions(editRepetitions + 1)}
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="text-sm font-semibold">Timeframe</div>
                  <div className="w-full flex flex-row items-center justify-between border border-1 rounded-lg ml-4">
                    <button
                      className="text-base pl-2"
                      onClick={() => {
                        if (TIMEFRAME_INDEX[editTimeframe] === 0) {
                          setEditTimeframe(TIMEFRAMES[TIMEFRAMES.length - 1])
                        } else {
                          setEditTimeframe(TIMEFRAMES[TIMEFRAME_INDEX[editTimeframe] - 1])
                        }
                      }}
                    >{"<"}</button>
                    <button
                      disabled={true}
                      className="text-base capitalize"
                    >
                      {editTimeframe?.toLowerCase()}
                    </button>
                    <button
                      className="text-base pr-2"
                      onClick={() => {
                        if (TIMEFRAME_INDEX[editTimeframe] === TIMEFRAMES.length - 1) {
                          setEditTimeframe(TIMEFRAMES[0])
                        } else {
                          setEditTimeframe(TIMEFRAMES[TIMEFRAME_INDEX[editTimeframe] + 1])
                        }
                      }}
                    >{">"}</button>
                  </div>
                </div>
              </div>
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}