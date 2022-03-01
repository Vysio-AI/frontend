import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {
    FolderIcon,
    BellIcon,
  } from '@heroicons/react/outline'
import { useQuery } from 'react-query';
import { getClient } from '../../api/clients';

export default function SelectClientDropdown({ currentClientId }) {

  const clients = useQuery(['client', currentClientId], () => getClient(currentClientId));

  // TODO: Fetch notifications

  return (
    <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <Menu.Button className="ml-2 p-2 rounded-full bg-slate-50">
            <BellIcon className="h-7 w-7"/>
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
            { client.isLoading &&
              <div className="flex flex-col items-center justify-between">
                <span className="text-indigo-600 mx-auto pt-4">
                  <FontAwesomeIcon icon={faCircleNotch} size='3x' spin />
                </span>
              </div>
            }
            { !client.isLoading && client.data && clients.data.map((client, index) => {
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