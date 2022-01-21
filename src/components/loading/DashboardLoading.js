import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '../../assets/vysio.png';

import Loading from "./Loading";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function DashboardLayout({ navLength }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-10 w-auto"
                    src={logo}
                    alt="Vysio"
                  />
                </div>
                <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                  {[...Array(navLength)].map((i) => (
                    <div
                      key={i}
                      className={classNames(
                        'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center text-sm font-medium rounded-md'
                      )}
                    >
                      <div className="animate-pulse w-full h-full py-1 flex space-between items-center border-2 rounded-md bg-gray-100">
                        <div className="animate-pulse w-7 h-6 m-1 rounded-md bg-gray-200">
                        </div>
                        <div className="animate-pulse w-full h-6 mx-2 rounded-md bg-gray-200">
                        </div>
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div className="flex items-center h-full">
                      <div className="animate-pulse w-12 h-12 rounded-md bg-gray-100">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-10 w-auto"
                  src={logo}
                  alt="Vysio"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {[...Array(navLength)].map((i) => (
                  <div
                    key={i}
                    className={classNames(
                      'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center text-sm font-medium rounded-md'
                    )}
                  >
                    <div className="animate-pulse w-full h-full py-1 flex space-between items-center rounded-md bg-gray-100">
                      <div className="animate-pulse w-7 h-6 m-1 rounded-md bg-gray-200">
                      </div>
                      <div className="animate-pulse w-full h-6 mx-2 rounded-md bg-gray-200">
                      </div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center h-full">
                  <div className="animate-pulse w-14 h-10 mt-1 rounded-full bg-gray-100">
                  </div>
                  <div className="animate-pulse w-full h-10 mx-3 mt-1 rounded-md bg-gray-100">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Loading />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
