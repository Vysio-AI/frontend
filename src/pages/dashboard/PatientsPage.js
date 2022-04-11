import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import PatientList from "../../components/PatientList";
import PatientView from "../../components/PatientView";
import InvitePatientModal from "../../components/InvitePatientModal";
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getClients } from '../../api/clients';
import InviteDropdown from "../../components/InviteDropdown";

export default function PatientsPage({ location }) {
  const { isLoading } = useAuth0();
  const [showDirectory, setShowDirectory] = useState(true);
  const [patientId, setPatientId] = useState(null);

  const [invitePatientModalOpen, setInvitePatientModalOpen] = useState(false);

  const clients = useQuery('clients', () => getClients());

  const history = useHistory();

  useEffect(() => {
    if (location?.state?.invitePatientModalOpen) {
      setInvitePatientModalOpen(true);
      history.replace();
    }
  }, [])

  const setShowPatient = (patientId) => {
    setPatientId(patientId);
    setShowDirectory(false);
  }

  if (clients.isLoading || isLoading) {
    return <Loading />
  }

  console.log(clients.data)

  return (
    <div>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="-ml-4 -mt-2 pl-2 pt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <h1 className="text-3xl font-bold leading-6 text-gray-900">Patients</h1>
          <div className="flex flex-row items-center">
            <InviteDropdown />
            <button
              className="ml-2 px-4 py-2 bg-blue-400 rounded-lg text-white font-semibold"
              onClick={() => setInvitePatientModalOpen(true)}
            >
              + Invite
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-full flex overflow-hidden bg-white">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            {showDirectory &&
              <div className="xl:hidden order-first flex flex-col flex-shrink-0 w-96 border-r border-gray-200">
                <PatientList patients={clients.data} setShowPatient={setShowPatient} currentlySelected={patientId} />
              </div>
            }
            {!showDirectory &&
              <PatientView patientId={patientId} setPatientId={setPatientId} setShowDirectory={setShowDirectory} />
            }
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              <PatientList patients={clients.data} setShowPatient={setShowPatient} currentlySelected={patientId} />
            </aside>
          </div>
        </div>
      </div>
      <InvitePatientModal open={invitePatientModalOpen} setOpen={setInvitePatientModalOpen} />
    </div>
  )
}
