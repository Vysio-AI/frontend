import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen mx-0 my-0">
      <span className="text-green-500 mx-auto">
        <FontAwesomeIcon icon={faCircleNotch} size='3x' spin />
      </span>
    </div>
  );
}