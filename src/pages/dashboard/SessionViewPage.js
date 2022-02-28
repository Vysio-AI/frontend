import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getSession, updateSession } from '../../api/sessions';
import { getClient } from '../../api/clients';
import { getPlan } from '../../api/plans';

import VideoPlayer from "../../components/VideoPlayer";

// Wsyiwyg editor
import {EditorState, convertToRaw, convertFromRaw} from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Momentjs
import Moment from 'react-moment'
import 'moment-timezone'

const AUTO_SAVE_TIMER = 2000; // Time before autosave is triggered in ms

export default function SessionViewPage() {
  const { sessionId } = useParams();
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  // Notes
  const [viewPrivateNotes, setViewPrivateNotes] = useState(false)
  const [privateNotes, setPrivateNotes] = useState(() => EditorState.createEmpty())
  const [publicNotes, setPublicNotes] = useState(() => EditorState.createEmpty())
  const [shouldAutoSave, setShouldAutoSave] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState(null)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(true)

  // React query
  const queryClient = useQueryClient()

  useEffect(() => {
      const resizeObserver = new ResizeObserver((event) => {
          // Depending on the layout, you may need to swap inlineSize with blockSize
          // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
          setWidth(event[0].contentBoxSize[0].inlineSize*(0.6));
          setHeight(Math.floor(event[0].contentBoxSize[0].inlineSize*0.6/1.777));
      });

      resizeObserver.observe(document.getElementById("dashboard-container"));
  });

  const sessionQuery = useQuery(['session', sessionId], () => getSession(sessionId));

  const clientQuery = useQuery(['client', sessionQuery?.data?.clientId], () => getClient(sessionQuery?.data?.clientId))

  const planQuery = useQuery(['plan', sessionQuery?.data?.planId], () => getPlan(sessionQuery?.data?.planId))

  const sessionMutation = useMutation(({ sessionId, updateData }) => updateSession(sessionId, updateData), {
    onSuccess: () => {
      return queryClient.invalidateQueries(['session', sessionId])
    }
  })

  useEffect(() => {
    if (sessionQuery.data) {
      if (sessionQuery.data.privatePractitionerNotes) {
        const contentState = convertFromRaw(JSON.parse(sessionQuery.data.privatePractitionerNotes))
        setPrivateNotes(EditorState.createWithContent(contentState))
      }
      if (sessionQuery.data.publicPractitionerNotes) {
        const contentState = convertFromRaw(JSON.parse(sessionQuery.data.publicPractitionerNotes))
        setPublicNotes(EditorState.createWithContent(contentState))
      }
    }
  }, [sessionQuery.data])

  const handlePublicNotesChange = (editorState) => {
    setPublicNotes(editorState)
    setIsSaved(false)
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
    const timer = setTimeout(() => {
      setShouldAutoSave(true)
    }, AUTO_SAVE_TIMER);
    setAutoSaveTimer(timer)
  }

  const handlePrivateNotesChange = (editorState) => {
    setPrivateNotes(editorState)
    setIsSaved(false)
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
    const timer = setTimeout(() => {
      setShouldAutoSave(true)
    }, AUTO_SAVE_TIMER);
    setAutoSaveTimer(timer)
  }

  // Run autosave logic
  useEffect(() => {
    if (shouldAutoSave) {
      setIsAutoSaving(true)
      console.log("autosaving...")
      const rawPublicNotes = JSON.stringify(convertToRaw(publicNotes.getCurrentContent()))
      const rawPrivateNotes = JSON.stringify(convertToRaw(privateNotes.getCurrentContent()))
      const data = {
        publicPractitionerNotes: rawPublicNotes,
        privatePractitionerNotes: rawPrivateNotes
      }
      sessionMutation.mutate({
        sessionId: sessionId,
        updateData: data
      })
      setShouldAutoSave(false)
      setTimeout(() => {
        setIsAutoSaving(false)
        setIsSaved(true)
      }, 2000);
    }
  }, [shouldAutoSave, sessionId])

  // Clean up
  useEffect(() => {
    return () => {
      clearTimeout(autoSaveTimer)
    }
  }, [])

  if (sessionQuery.isLoading || clientQuery.isLoading || planQuery.isLoading) {
      return <div></div>
  }

  if (sessionMutation.data) {
    console.log(sessionMutation.data)
  }

  return (
    <div className="flex flex-row h-full w-full overflow-hidden">
      <div className="flex flex-col justify-start w-3/5">
        <div className="flex flex-row items-center justify-start mx-2 my-2">
          <button
            className="text-lg text-slate-400"
          >
            {`< ${clientQuery.data.firstName} ${clientQuery.data.lastName}`}
          </button>
        </div>
        <div className="flex flex-row items-center justify-between mx-2 mb-10">
          <h1 className="text-3xl font-bold">{planQuery.data.name}</h1>
          <h1 className="text-2xl text-slate-400">
            <Moment format="MM/DD/YYYY">{sessionQuery.data.endTime}</Moment>
          </h1>
        </div>
        <VideoPlayer videoId={sessionQuery.data.videoId} width={width} height={height}/>
        <div className="mx-2 my-2 mt-10 flex flex-row justify-between w-full">
          <div className="flex flex-col items-start w-1/2">
            <h1 className="font-bold text-2xl">Client Notes</h1>
            <p className="text-base text-slate-400">{sessionQuery.data.clientNotes}</p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h1 className="font-bold text-2xl">Routine</h1>
            <ul className="w-full">
              { planQuery.data.exercises.map((exercise, idx) => (
                <li className="flex flex-row px-2 py-1 items-center justify-between w-full">
                  <div>
                    {idx+1}. {exercise.activityType}
                  </div>
                  <p className="">{exercise.duration}</p>
                </li>
              ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start ml-6 w-full h-full">
        <div className="flex flex-row items-center justify-start mx-2 my-2">
          <button
            className="text-lg text-slate-400 invisible"
            disabled
          >
            {`< ${clientQuery.data.firstName} ${clientQuery.data.lastName}`}
          </button>
        </div>
        <div className="flex flex-row items-start justify-between mx-2 mb-7">
          <h1 className="text-2xl font-bold">My Notepad</h1>
          <div className="flex flex-col items-end justify-center">
            <div className="flex flex-row items-center justify-end">
              { !isAutoSaving && isSaved &&
                <p className="text-sm text-slate-300 mr-2">Saved</p>
              }
              { isAutoSaving && 
                <p className="text-sm text-slate-300 mr-2">Autosaving...</p>
              }
              <div className="flex flex-row items-center justify-center border border-1 rounded-xl">
                <button
                  className={`px-6 rounded-l-lg ${viewPrivateNotes === true ? "bg-slate-300 text-slate-400" : "bg-slate-200 text-black"}`}
                  onClick={() => setViewPrivateNotes(false)}
                >
                  Public
                </button>
                <button
                  className={`px-6 rounded-r-lg ${viewPrivateNotes === false ? "bg-slate-300 text-slate-400" : "bg-slate-200 text-black"}`}
                  onClick={() => setViewPrivateNotes(true)}
                >
                  Private
                </button>
              </div>
            </div>
            { viewPrivateNotes &&
              <span className="text-xs text-slate-300">Only you can view these notes</span>
            }
            { !viewPrivateNotes &&
              <span className="text-xs text-slate-300">{clientQuery.data.firstName} will be able to view these notes</span>
            }
          </div>
        </div>
        { !viewPrivateNotes &&
          <Editor 
            editorState={publicNotes}
            onEditorStateChange={handlePublicNotesChange}
            wrapperClassName={`h-1/2`}
            editorClassName={`bg-white h-full`}
          />
        }
        { viewPrivateNotes &&
          <Editor 
            editorState={privateNotes}
            onEditorStateChange={handlePrivateNotesChange}
            wrapperClassName={`h-1/2`}
            editorClassName={`bg-white h-full`}
          />
        }
      </div>
    </div>
  )
}