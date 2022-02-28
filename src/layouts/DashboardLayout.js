/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'

import { Link } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";
import DashboardLoading from "../components/loading/DashboardLoading";
import LogoutButton from "../components/buttons/LogoutButton";
import logo from '../assets/vysio.png';

import { useQuery } from 'react-query';
import { getSignupStatus } from '../api/signups';
import { useHistory } from "react-router-dom";

import NewUserModal from "../components/NewUserModal";

const navigation = [
  { name: 'Dashboard', regex: '\/dashboard$', href: '/dashboard', icon: HomeIcon },
  { name: 'Patients', regex: '\/dashboard\/patients', href: '/dashboard/patients', icon: UsersIcon },
  { name: 'Plans', regex: '\/dashboard\/plans', href: '/dashboard/plans', icon: FolderIcon },
  { name: 'Sessions', regex: '\/dashboard\/sessions', href: '/dashboard/sessions', icon: CalendarIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function isCurrent(regex) {
  const re = new RegExp(regex, 'i')
  if (window.location.pathname.match(re)) {
    return true
  } else {
    return false
  }
}

function DashboardLayout({ children, sidebar }) {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const history = useHistory();

  const signupStatus = useQuery('signup-status', getSignupStatus);

  if (isLoading) {
    console.log("Navlength: " + navigation.length);
    return <DashboardLoading navLength={navigation.length} />
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      redirectUri: window.location.origin + '/dashboard'
    })
  }

  console.log(signupStatus);

  if (signupStatus.isLoading) {
    return <DashboardLoading navLength={navigation.length} />
  }

  if (signupStatus.isError || !signupStatus.data) {
    logout({ returnTo: window.location.origin });
    history.push("/");
  }

  // User has not been signed up previously
  if (signupStatus.data.signedUp == false && !newUserModalOpen) {
    setNewUserModalOpen(true);
  }

  // User has signed up previously as a client
  if (signupStatus.data.signedUp && signupStatus.data.type == 'client') {
    logout({ returnTo: window.location.origin });
    history.push("/");
  }

  if (signupStatus.data.signedUp && signupStatus.data.type == 'practitioner' && newUserModalOpen) {
    setNewUserModalOpen(false);
  }

  return (
    isAuthenticated &&
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
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        isCurrent(item.regex)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isCurrent(item.regex) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 min-w-full">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={user.picture}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.given_name} {user.family_name}</p>
                      <Link
                        to="/dashboard/profile"
                        className="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-2 bottom-5">
                <LogoutButton />
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
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isCurrent(item.regex) ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        isCurrent(item.regex) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex border-t border-gray-200 p-4">
              <div href="#" className="w-full group block">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={user.picture}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.given_name} {user.family_name}</p>
                    <Link
                      to="/dashboard/profile"
                      className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                    >
                      View profile
                    </Link>
                  </div>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-y-auto">
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
        <main className="flex-1 relative z-0 focus:outline-none bg-white">
          <div className="w-full h-full overflow-y-auto" id="dashboard-container">
            {children}
          </div>
        </main>
      </div>
      <NewUserModal open={newUserModalOpen} setOpen={setNewUserModalOpen} user={user}/>
    </div>
  )
}

export default DashboardLayout
