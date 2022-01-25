import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import PageHeading from "../../components/PageHeading";
import PaginationCardFooter from "../../components/PaginationCardFooter";
import {
  ChevronRightIcon,
  CheckCircleIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

const sessions = [
  {
    id: 1,
    patient: {
      id: 1,
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    plan: {
      id: 2,
      name: 'Shoulder Mobility Training',
    },
    date: '2022-01-08',
    dateFull: 'January 8, 2022',
    notes: true,
  },
  {
    id: 2,
    patient: {
      id: 1,
      name: 'Lindsay Walton',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    plan: {
      id: 1,
      name: 'Shoulder Strength Training',
    },
    date: '2022-01-07',
    dateFull: 'January 7, 2022',
    notes: false,
  },
]

function SessionNotesAnnotation(props) {
  const isNotes = props.notes

  if (isNotes) {
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500">
        <AnnotationIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-indigo-500" aria-hidden="true" />
        Patient left notes
      </p>
    )
  } else {
    return (
      <p className="mt-2 flex items-center text-sm text-gray-500">
        No patient notes
      </p>
    )
  }
}


export default function SessionsPage() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <div>
      <PageHeading title="Sessions" />
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {sessions.map((session) => (
            <li key={session.id}>
              <a href="http://github.com" className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src={session.patient.imageUrl} alt="" />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-black truncate">{session.patient.name}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="truncate">{session.plan.name}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            Completed on <time dateTime={session.date}>{session.dateFull}</time>
                          </p>
                          <SessionNotesAnnotation notes={session.notes} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <PaginationCardFooter/>
      </div>
    </div>
  )
}
