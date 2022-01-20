import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronLeftIcon, FilterIcon, MailIcon, PhoneIcon, SearchIcon } from '@heroicons/react/solid'
import ActivityHeatMap from './ActivityHeatMap';

export default function PlanView({ plan, setShowDirectory }) {

  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
      <button
        className="absolute left-4 top-4 flex items-center justify-between p-1 bg-gray-100 rounded-md border border-1 hover:bg-gray-200 hover:border-gray-300"
        onClick={() => setShowDirectory(true)}
      >
        <ChevronLeftIcon className="w-7 h-7" />
      </button>
      <article>
        {/* Profile header */}
        <div>
          <div>
            <img className="h-32 w-full object-cover lg:h-48" src={plan.imageUrl} alt="" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={plan.imageUrl}
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{plan.name}</h1>
                </div>
              </div>
            </div>
            <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{plan.name}</h1>
            </div>
          </div>
        </div>
      </article>
      <div className="space-y-8 my-4 mx-4 sm:mx-6 md:mx-8 divide-y divide-gray-200">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            People
          </label>
          <div class="flex -space-x-1 overflow-hidden">
            {plan.patients.map(_patient => <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={_patient.imgUrl} alt=""/>)}
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Frequency
          </label>
          <div class="flex -space-x-1 overflow-hidden">
            <p>{plan.frequency}</p>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Length
          </label>
          <div class="flex -space-x-1 overflow-hidden">
            <p>{plan.exercises.map(i=>i.length).reduce((a,b) =>a+b)} Seconds</p>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Exercise Count
          </label>
          <div class="flex -space-x-1 overflow-hidden">
            <p>{plan.exercises.length}</p>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
