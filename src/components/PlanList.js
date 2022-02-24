import React, { Fragment } from 'react';
import { FilterIcon, SearchIcon } from '@heroicons/react/solid'

export default function PlanList({ plans, setShowPlan, currentlySelected }) {

  return (
    <Fragment>
      <div className="px-6 pt-6 pb-4">
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
      <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Plans">
        <ul>
          {plans && plans.map((plan) => (
            <li key={plan.id}>
              <div
                className={`relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 ${plan.id == currentlySelected?.id ? "border border-2 border-indigo-600" : ""}`}
                onClick={() => setShowPlan(plan.id)}
              >
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{plan.name}</p>
                    <div className="flex -space-x-1 overflow-hidden">
                      {plan.clients.map(_client => <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={_client.imgUrl} alt=""/>)}
                    </div>
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
