import { Fragment } from 'react'
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

export default function AddPatientDropdown({ planId }) {

  const clients = useQuery('clients', () => getClients());

  const plan = useQuery(['plan', planId], () => getPlan(planId));

  const queryClient = useQueryClient()

  const addClientToPlan = useMutation(({ id, updateData }) => updatePlan(id, updateData), {
    onSuccess: () => {
      queryClient.invalidateQueries('plans')
      return queryClient.invalidateQueries(['plan', planId])
    },
  });

  return (
    <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <Menu.Button className="flex-shrink-0 bg-white inline-block h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Add team member</span>
            <PlusSmIcon className="inline-block h-5 w-5 rounded-full" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1 overflow-y-auto max-h-48">
            { plan.isLoading || clients.isLoading || addClientToPlan.isLoading &&
              <div className="flex flex-col items-center justify-between">
                <span className="text-indigo-600 mx-auto pt-4">
                  <FontAwesomeIcon icon={faCircleNotch} size='3x' spin />
                </span>
              </div>
            }
            { !clients.isLoading && !addClientToPlan.isLoading && clients.data && clients.data.map((client, index) => {
              return (
                <Menu.Item key={client.id}>
                  {({ active }) => {
                    if (plan.data.clients.find(c => c.id === client.id)) {
                      return (
                        <a
                          className="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center justify-between hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-left">
                            <p className="font-semibold text-sm">{client.firstName} {client.lastName}</p>
                          </div>
                          <CheckIcon className="w-5 h-5"/>
                        </a>
                      )
                    } else {
                      return (
                        <a
                          onClick={() => addClientToPlan.mutate({
                            id: planId,
                            updateData: {
                              clients: {
                                connect: [{ id: client.id }]
                              }
                            }
                          })}
                          className="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center justify-between hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-left">
                            <p className="font-semibold text-sm">{client.firstName} {client.lastName}</p>
                          </div>
                        </a>
                      )
                    }
                  }}
                </Menu.Item>
              )
            })
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}