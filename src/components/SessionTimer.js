import React from 'react';

export default function SessionTimer({ timer }) {
  const {
    seconds,
    minutes,
    hours,
  } = timer;

  return (
    <div className="px-2">
      <div className="text-xl">
        <span>{(hours < 10) ? `0${hours}` : hours}</span>:<span>{(minutes < 10) ? `0${minutes}` : minutes}</span>:<span>{(seconds < 10) ? `0${seconds}` : seconds}</span>
      </div>
    </div>
  )
}
