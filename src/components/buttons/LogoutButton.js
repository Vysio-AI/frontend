import React from 'react';

import { LogoutIcon } from '@heroicons/react/outline';
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  }

  return (
    <button className="px-4 py-2" onClick={handleLogout}>
      <LogoutIcon className="w-7 h-7 text-gray-500 hover:text-gray-200" />
    </button>
  )
}