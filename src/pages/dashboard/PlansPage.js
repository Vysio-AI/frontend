import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/loading/Loading";
import PlanList from "../../components/PlanList";
import PlanView from "../../components/PlanView";
import PageHeading from "../../components/PageHeading";
import { useState } from 'react'

const directory = {
  S: [
    {
      id: 1,
      name: 'Shoulder Rotation Routine',
      patients: [
        {
          imgUrl: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
          imgUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      ],
      frequency: "2x Weekly",
      exercises: [
        {
          id: 0,
          name: "Shoulder Rotation",
          focus_area: "Shoulder",
          length: 120,
          notes: "",
        },
        {
          id: 1,
          name: "Internal Rotation",
          focus_area: "Shoulder",
          length: 120,
          notes: "",
        },
        {
          id: 2,
          name: "External Rotation",
          focus_area: "Shoulder",
          length: 60,
          notes: "",
        },
      ],
    },
    {
      id: 2,
      name: 'Shoulder Strength Routine',
      patients: [
        {
          imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
        },
      ],
      frequency: "7x Weekly",
      exercises: [
        {
          id: 3,
          name: "Trap Raises",
          focus_area: "Shoulder",
          length: 600,
          notes: "",
        },
        {
          id: 4,
          name: "Upright Row",
          focus_area: "Shoulder",
          length: 600,
          notes: "",
        },
      ],
    },
  ],
}

export default function PlansPage() {
  const { isLoading } = useAuth0();
  const [showDirectory, setShowDirectory] = useState(true);
  const [plan, setPlan] = useState(null);

  const setShowPlan = (plan) => {
    setPlan(plan);
    setShowDirectory(false);
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <PageHeading title="Plans"/>
      <div className="relative h-screen flex overflow-hidden bg-white">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            {showDirectory &&
              <div className="xl:hidden order-first flex flex-col flex-shrink-0 w-96 border-r border-gray-200">
                <PlanList directory={directory} setShowPlan={setShowPlan} />
              </div>
            }
            {!showDirectory &&
              <PlanView plan={plan} setShowDirectory={setShowDirectory} />
            }
            <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
              <PlanList directory={directory} setShowPlan={setShowPlan} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
