import React, { useEffect, useState } from 'react';
import { useMutation, QueryClient } from 'react-query';
import axios from 'axios';
import { io } from 'socket.io-client';
import SessionTimer from './SessionTimer';
import { useStopwatch } from 'react-timer-hook';


import ActivityVisualization from './ActivityVisualization';

const postSession = async (data) => {
  const response = await axios({
    method: 'post',
    url: `${process.env.BASE_URL}/sessions`,
    data: data
  });
}

const exerciseList = [
  "PENDULUM",
  "ABDUCTION",
  "FORWARD_ELEVATION",
  "INTERNAL_ROTATION",
  "EXTERNAL_ROTATION",
  "TRAPEZIUS_EXTENSION",
  "UPRIGHT_ROW"
];

export default function SocketComponent() {
  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [intervalRef, setIntervalRef] = useState(null);
  const [sessionRunning, setSessionRunning] = useState(false);

  const [exerciseProgress, setExerciseProgress] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [exerciseTargets, setExerciseTargets] = useState([15, 15, 15, 15, 15, 15, 15]);

  const [sentTime, setSentTime] = useState(null);
  const [latency, setLatency] = useState(0);

  const timer = useStopwatch({ autoStart: false });


  const { isLoading, isError, error, createSession } = useMutation(postSession, {
    onSuccess: () => {
      QueryClient.invalidateQueries('currentSession');
    }
  })

  useEffect(() => {
    const socket = io("localhost:3000", { secure: false });
    setSocket(socket);

    socket.on("connect", () => {
      console.log(`Connected to socket with id: ${socket.id}`);
    });

    socket.on(`sessionFrame:2`, (msg) => {
      if (msg.classification !== null) {
        setExerciseProgress(arr => {
          if (!sessionRunning) {
            return arr;
          }
          const newArr = [...arr];
          newArr[msg.classification] = newArr[msg.classification] + 1;
          return newArr;
        });
        console.log(msg);
      }
    });

    return () => socket.emit('end');
  }, [sessionId, sessionRunning, sentTime]);

  console.log(exerciseProgress);

  const startSession = () => {
    console.log("started session");
    setSessionRunning(true);
    timer.start();
    setIntervalRef(setInterval(() => {
      socket.send("Ping");
    }, 50));
  }

  const endSession = () => {
    clearInterval(intervalRef);
    setSessionRunning(false);
    timer.pause();
  }

  const resetSession = () => {
    timer.reset(null, false);
    setLatency(0);
    setExerciseProgress([0, 0, 0, 0, 0, 0, 0]);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-white overflow-hidden shadow rounded-lg mx-1 my-2">
        <div className="px-4 py-5 sm:p-6 flex flex-row">
          <button
            className="px-4 py-2 border border-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            onClick={startSession}
          >
            Start Session
          </button>
          <button
            className="px-4 py-2 border border-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            onClick={endSession}
          >
            End Session
          </button>
          <button
            className="px-4 py-2 border border-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            onClick={resetSession}
          >
            Reset
          </button>
          <SessionTimer timer={timer} />
          <div className="px-4 py-2 flex flex-row">
            <p className="px-1">Latency: {latency}</p>
          </div>
          <button
            className="px-4 py-2 border border-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            onClick={() => {
              socket.send("Ping")
            }}
          >
            Send Message
          </button>
        </div>
      </div>
      <ActivityVisualization exerciseList={exerciseList} progressArray={exerciseProgress} targetArray={exerciseTargets} />
    </div>
  )
}
