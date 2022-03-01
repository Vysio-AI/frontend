import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {
  PlusSmIcon,
} from '@heroicons/react/outline'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getClients } from '../../api/clients';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectClientDropdown({ setCurrentClientId }) {
  const [currentClient, setCurrentClient] = useState(null)

  const clients = useQuery('clients', () => getClients());

  if (clients.data && clients.data.length > 0 && !currentClient) {
    setCurrentClient(clients.data[0])
    setCurrentClientId(clients.data[0].id)
  }

  return (
    <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <Menu.Button className="flex flex-row items-center">
          <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold leading-6 text-gray-900 pl-4 pr-2 py-4">{currentClient?.firstName} {currentClient?.lastName}</h1>
          <ChevronDownIcon className="h-9 w-9"/>
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
        <Menu.Items className="origin-top-left absolute left-4 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1 overflow-y-auto max-h-48">
            { clients.isLoading &&
              <div className="flex flex-col items-center justify-between">
                <span className="text-indigo-600 mx-auto pt-4">
                  <FontAwesomeIcon icon={faCircleNotch} size='3x' spin />
                </span>
              </div>
            }
            { !clients.isLoading && clients.data && clients.data.map((client, index) => {
              return (
                <Menu.Item key={client.id}>
                  {({ active }) => {
                    if (client.id === currentClient.id) {
                      return (
                        <a
                          disabled={true}
                          className="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center justify-between hover:bg-gray-100 hover:cursor-pointer"
                        >
                          <div className="flex flex-col items-left">
                            <p className="font-semibold text-base xl:text-lg">{client.firstName} {client.lastName}</p>
                          </div>
                          <CheckIcon className="w-5 h-5"/>
                        </a>
                      )
                    } else {
                      return (
                        <a
                          onClick={() => {
                            setCurrentClientId(client.id)
                            setCurrentClient(client)
                          }}
                          className="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center justify-between hover:bg-gray-100 hover:cursor-pointer"
                        >
                          <div className="flex flex-col items-left">
                            <p className="font-semibold text-base xl:text-lg">{client.firstName} {client.lastName}</p>
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