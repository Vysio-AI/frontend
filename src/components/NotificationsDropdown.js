/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query'
import { getSessionNotifications } from '../api/sessionNotifications';

import {
  BellIcon
} from '@heroicons/react/outline'

export default function NotificationsDropdown() {
  const sessionNotifications = useQuery('sessionNotifications', getSessionNotifications);

  console.log(sessionNotifications);

  return (
    <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <Menu.Button className="ml-2 p-2 rounded-full bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <BellIcon className="h-7 w-7"/>
          { !sessionNotifications.isLoading && sessionNotifications.data && sessionNotifications.data.length > 0 &&
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-600" />
          }
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 overflow-y-auto max-h-64">
            { sessionNotifications.isLoading &&
              <div className="flex flex-col items-center justify-between">
                <span className="text-indigo-600 mx-auto pt-4">
                  <FontAwesomeIcon icon={faCircleNotch} size='3x' spin />
                </span>
              </div>
            }
            { !sessionNotifications.isLoading && sessionNotifications.data && sessionNotifications.data.length > 0 && sessionNotifications.data.map((sessionNotification, index) => {
                return (
                  <Menu.Item key={sessionNotification.id}>
                    {() => (
                      <div
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center justify-between"
                      >
                        <div className="flex flex-col items-left">
                          <p className="font-semibold text-base">{sessionNotification.sessionId} {sessionNotification.viewed}</p>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                )
              })
            }
            { !sessionNotifications.isLoading && sessionNotifications.data && sessionNotifications.data.length == 0 &&
              <Menu.Item>
                <div
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center justify-between"
                >
                  <p className="font-semibold text-base">No Notifications</p>
                </div>
              </Menu.Item>
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
