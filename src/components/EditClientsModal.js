import { Fragment, useRef, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, XCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getClients } from '../api/clients';
import { updatePlan, getPlan } from '../api/plans';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function EditClientsModal({ open, setOpen, planId }) {
  const queryClient = useQueryClient();
  const [clientsToAdd, setClientsToAdd] = useState([]);
  const [clientsToRemove, setClientsToRemove] = useState([]);

  const plan = useQuery(['plan', planId], () => getPlan(planId));

  const clients = useQuery('clients', () => getClients(100, 0));

  const editPlan = useMutation(({ id, updateData }) => updatePlan(id, updateData), {
    onSuccess: () => {
      setClientsToAdd([])
      setClientsToRemove([])
      setOpen(false)
      return queryClient.invalidateQueries(['plan', planId])
    },
  });

  const removeClientsFromPlan = (clientIds) => {
    const data = {
      clients: {
        disconnect: clientIds.map(id => {
            return { id: id }
        })
      }
    }

    editPlan.mutate({
        id: planId,
        updateData: data
    })
  }

  const addClientsToPlan = (clientIds) => {
    const data = {
      clients: {
        connect: clientIds.map(id => {
            return { id: id }
        })
      }
    }

    editPlan.mutate({
        id: planId,
        updateData: data
    })
  }

  const handleSaveChanges = () => {
    if (clientsToAdd.length > 0) {
      addClientsToPlan(clientsToAdd)
    }
    if (clientsToRemove.length > 0) {
      removeClientsFromPlan(clientsToRemove)
    }
    setOpen(false)
  }

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
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 mb-6">
                    Add/Remove Patients
                  </Dialog.Title>
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    { plan && plan.data && clients && clients.data && clients.data.map((client) => (
                      <li key={client.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img className="h-8 w-8 rounded-full" src={client?.imageUrl} alt="" />
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="text-sm font-medium text-gray-900 truncate">{client.firstName} {client.lastName}</p>
                            <p className="text-sm text-gray-500 truncate">{client.email}</p>
                          </div>
                          <div>
                            { ((plan.data.clients.find(c => c.id === client.id)
                              && !clientsToRemove.includes(client.id)) ||
                              clientsToAdd.includes(client.id)) &&
                              <button
                                className="p-2 group"
                                onClick={() => {
                                  if (clientsToAdd.includes(client.id)) {
                                    setClientsToAdd(clientsToAdd.filter(i => i !== client.id))
                                  } else if (!clientsToRemove.includes(client.id)) {
                                    setClientsToRemove([...clientsToRemove, client.id])
                                  }
                                }}
                              >
                                <CheckIcon className="w-5 h-5 group-hover:hidden"/>
                                <XCircleIcon className="w-6 h-6 hidden group-hover:block"/>
                              </button>
                            }
                            { ((!plan.data.clients.find(c => c.id === client.id)
                              && !clientsToAdd.includes(client.id))
                              || clientsToRemove.includes(client.id)) &&
                              <button
                                className="p-2"
                                onClick={() => {
                                  if (clientsToRemove.includes(client.id)) {
                                    setClientsToRemove(clientsToRemove.filter(i => i !== client.id))
                                  } else if (!clientsToAdd.includes(client.id)) {
                                    setClientsToAdd([...clientsToAdd, client.id])
                                  }
                                }}
                              >
                                <PlusCircleIcon className="w-6 h-6"/>
                              </button>
                            }
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSaveChanges}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setClientsToAdd([])
                    setClientsToRemove([])
                    setOpen(false)
                  }}
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