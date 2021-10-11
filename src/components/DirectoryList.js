import React, { Fragment } from 'react';
import { ChevronLeftIcon, FilterIcon, MailIcon, PhoneIcon, SearchIcon } from '@heroicons/react/solid'

export default function DirectoryList({ directory, setShowPatient }) {

  return (
    <Fragment>
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Directory</h2>
        <p className="mt-1 text-sm text-gray-600">Search directory of 3,018 employees</p>
        <form className="mt-6 flex space-x-4" action="#">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
        {Object.keys(directory).map((letter) => (
          <div key={letter} className="relative">
            <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
              <h3>{letter}</h3>
            </div>
            <ul role="list" className="relative z-0 divide-y divide-gray-200">
              {directory[letter].map((patient) => (
                <li key={patient.id}>
                  <div
                    className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500"
                    onClick={() => setShowPatient(patient)}
                  >
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={patient.imageUrl} alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href="#" className="focus:outline-none">
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500 truncate">{patient.role}</p>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </Fragment>
  )
}