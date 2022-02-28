import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getClient } from '../../api/clients';

import { LocationMarkerIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'

// Momentjs
import Moment from 'react-moment'
import 'moment-timezone'

export default function InformationCard({ currentClientId }) {
    const client = useQuery(['client', currentClientId], () => getClient(currentClientId));

    console.log(client.data)

    return (
      <div className="h-full w-full bg-slate-50 rounded-xl shadow-lg outline outline-1 outline-gray-100 flex flex-col items-start justify-start p-4">
        <div className="w-full flex flex-row justify-between items-start p-2 pb-4">
            <h1 className="text-3xl font-semibold">Information</h1>
            <img key={client.data?.id} className="inline-block h-26 w-26 rounded-full ring-2 ring-white" src={client.data?.imageUrl} alt=""/>
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <p className="font-semibold text-lg">Age</p>
            { client.data?.birthday &&
                <Moment fromNow ago className="text-lg">{client.data?.birthday}</Moment>
            }
            { !client.data?.birthday &&
                <p className="text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <p className="font-semibold text-lg">Last Active</p>
            { client.data?.lastActive &&
                <Moment fromNow className="text-lg">{client.data?.lastActive}</Moment>
            }
            { !client.data?.lastActive &&
                <p className="text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <LocationMarkerIcon className="h-6 w-6" />
            { client.data?.city &&
                <p className="text-lg">{client.data?.city}</p>
            }
            { !client.data?.city &&
                <p className="text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <MailIcon className="h-6 w-6" />
            { client.data?.email &&
                <p className="text-lg">{client.data?.email}</p>
            }
            { !client.data?.email &&
                <p className="text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <PhoneIcon className="h-6 w-6" />
            { client.data?.phoneNumber &&
                <p className="text-lg">{client.data?.phoneNumber}</p>
            }
            { !client.data?.phoneNumber &&
                <p className="text-lg">N/A</p>
            }
        </div>
      </div>
    )
  }