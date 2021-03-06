import { Fragment, useRef, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { createExercise } from '../api/exercises';

const exercises = [
  {
    id: 1,
    name: "Pendulum",
    value: "PENDULUM"
  },
  {
    id: 2,
    name: "Abduction",
    value: "ABDUCTION"
  },
  {
    id: 3,
    name: "Forward Elevation",
    value: "FORWARD_ELEVATION"
  },
  {
    id: 4,
    name: "Internal Rotation",
    value: "INTERNAL_ROTATION"
  },
  {
    id: 5,
    name: "External Rotation",
    value: "EXTERNAL_ROTATION"
  },
  {
    id: 6,
    name: "Trapezius Extension",
    value: "TRAPEZIUS_EXTENSION"
  },
  {
    id: 7,
    name: "Upright Row",
    value: "UPRIGHT_ROW"
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AddExerciseModal({ open, setOpen, planId }) {
  const [exerciseSelected, setExerciseSelected] = useState(exercises[0])
  const [notes, setNotes] = useState("")
  const [duration, setDuration] = useState(30);

  const queryClient = useQueryClient()

  const addExercise = useMutation(() => createExercise(planId, exerciseSelected.value, duration), {
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries(['plan', planId])
      return queryClient.invalidateQueries('plans')
    },
  })

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Add Exercise
                  </Dialog.Title>
                  <div className="mt-5">
                    <Listbox value={exerciseSelected} onChange={setExerciseSelected} >
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium text-gray-700">Select exercise</Listbox.Label>
                          <div className="mt-1 relative">
                            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 sm:text-sm">
                              <span className="block truncate">{exerciseSelected.name}</span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {exercises.map((exercise) => (
                                  <Listbox.Option
                                    key={exercise.id}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'text-white bg-blue-400' : 'text-gray-900',
                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={exercise}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                          {exercise.name}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-blue-400',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                          >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                      Length (s)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="length"
                        id="length"
                        className="shadow-sm focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="30"
                        value={duration}
                        onChange={e => setDuration(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="notes"
                        id="notes"
                        className="shadow-sm focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={() => addExercise.mutate()}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
