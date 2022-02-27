import React, { Fragment } from 'react';
import { FilterIcon, SearchIcon } from '@heroicons/react/solid'

export default function PatientList({ patients, setShowPatient, currentlySelected }) {

  return (
    <Fragment>
      <div className="px-4 pt-2 pb-4">
        <form className="mt-6 flex space-x-4" action="#">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm h-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="focus:ring-pink-500 focus:border-pink-500 block w-full h-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
      <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Clients">
        <ul>
          {patients && patients.map((patient) => (
            <li key={patient.id}>
              <div
                className={`relative px-6 py-5 m-2 rounded-lg flex items-center space-x-3 bg-slate-50 hover:bg-gray-100 shadow-lg outline outline-1 outline-gray-100 ${patient.id == currentlySelected ? "border-l-8 border-blue-400 ml-3 mr-1" : ""}`}
                onClick={() => setShowPatient(patient.id)}
              >
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-base font-semibold text-gray-900">{patient.firstName} {patient.lastName}</p>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </Fragment>
  )
}
