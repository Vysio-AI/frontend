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
            <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">Information</h1>
            <img key={client.data?.id} className="inline-block h-12 w-12 lg:h-16 lg:w-16 2xl:h-20 2xl:w-20 rounded-full ring-2 ring-white" src={client.data?.imageUrl} alt=""/>
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <p className="font-semibold text-sm xl:text-base 2xl:text-lg">Age</p>
            { client.data?.birthday &&
                <Moment fromNow ago className="text-sm xl:text-base 2xl:text-lg">{client.data?.birthday}</Moment>
            }
            { !client.data?.birthday &&
                <p className="text-sm xl:text-base 2xl:text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <p className="font-semibold text-sm xl:text-base 2xl:text-lg">Last Active</p>
            { client.data?.lastActive &&
                <Moment fromNow className="text-sm xl:text-base 2xl:text-lg">{client.data?.lastActive}</Moment>
            }
            { !client.data?.lastActive &&
                <p className="text-sm xl:text-base 2xl:text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <LocationMarkerIcon className="h-4 w-4 2xl:h-6 2xl:w-6" />
            { client.data?.city &&
                <p className="text-sm xl:text-base 2xl:text-lg">{client.data?.city}</p>
            }
            { !client.data?.city &&
                <p className="text-sm xl:text-base 2xl:text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <MailIcon className="h-4 w-4 2xl:h-6 2xl:w-6" />
            { client.data?.email &&
                <p className="text-sm xl:text-base 2xl:text-lg">{client.data?.email}</p>
            }
            { !client.data?.email &&
                <p className="text-sm xl:text-base 2xl:text-lg">N/A</p>
            }
        </div>
        <div className="w-full flex flex-row justify-between items-center p-2">
            <PhoneIcon className="h-4 w-4 2xl:h-6 2xl:w-6" />
            { client.data?.phoneNumber &&
                <p className="text-sm xl:text-base 2xl:text-lg">{client.data?.phoneNumber}</p>
            }
            { !client.data?.phoneNumber &&
                <p className="text-sm xl:text-base 2xl:text-lg">N/A</p>
            }
        </div>
      </div>
    )
  }