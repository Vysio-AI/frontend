import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, RefreshIcon } from '@heroicons/react/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query'
import { getInvites } from '../api/invites'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InviteDropdown() {

  const invites = useQuery('invites', getInvites, {
    refetchInterval: 60000
  });

  const handleRetryInvite = (invite) => {
    // TODO: Retry by creating a new invite with the same params
  }

  console.log(invites.data)

  return (
    <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Invites
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
            { invites.isLoading &&
              <div className="flex flex-col items-center justify-between">
                <span className="text-indigo-600 mx-auto pt-4">
                  <FontAwesomeIcon icon={faCircleNotch} size='3x' spin />
                </span>
              </div>
            }
            { !invites.isLoading && invites.data && invites.data.map((invite, index) => {
              return (
                <Menu.Item key={invite.id}>
                  {({ active }) => (
                    <div
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm flex flex-row items-center justify-between"
                    >
                      <div className="flex flex-col items-left">
                        <p className="font-semibold text-base">{invite.clientFirstName} {invite.clientLastName}</p>
                        <p>{invite.clientEmail}</p>
                      </div>
                      <div className="flex flex-row items-center">
                        <div className={`rounded-xl px-3 py-2 text-white ${invite.status == "FAILED" ? "bg-red-500" : "bg-green-500"}`}>
                          {invite.status}
                        </div>
                        { invite.status == "FAILED" &&
                        <button
                          className="mx-1 px-2 py-2 border border-2 rounded-xl"
                          onClick={() => handleRetryInvite(invite)}
                        >
                          <RefreshIcon className="w-5 h-5"/>
                        </button>
                        }
                      </div>
                    </div>
                  )}
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