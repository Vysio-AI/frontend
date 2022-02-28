import React from 'react';
import ActivityDoughnutChart from './ActivityDoughnutChart';

export default function ActivityVisualization({ exerciseList, progressArray, targetArray }) {

  return (
    <div className="flex flex-wrap">
      {
        exerciseList.map((exercise, index) => (
          <div className="bg-white overflow-hidden shadow rounded-lg mx-1 my-1">
            <div className="px-4 py-5 sm:p-6 flex flex-col">
              <div className="flex flex-col self-start">
                <p className="uppercase text-xs text-gray-400 self-start">Shoulder</p>
                <p className="text-lg font-medium self-center">{exercise}</p>
              </div>
              <ActivityDoughnutChart className="self-center" progress={progressArray[index]} target={targetArray[index]} />
            </div>
          </div>
        ))
      }
    </div>
  )
}