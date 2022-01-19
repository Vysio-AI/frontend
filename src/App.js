import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './components/loading/Loading';

// Layout Imports
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';

// Page Imports
import LandingPage from './pages/public/LandingPage';
import HomePage from './pages/dashboard/HomePage';
import PatientsPage from './pages/dashboard/PatientsPage';
import PlansPage from './pages/dashboard/PlansPage';
import SessionsPage from './pages/dashboard/SessionsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import NotFound from './pages/errors/NotFound';

function App() {

  const publicRoutes = [
    "/",
  ];

  const dashboardRoutes = [
    "/dashboard",
    "/dashboard/patients",
    "/dashboard/plans",
    "/dashboard/sessions",
    "/dashboard/profile",
  ];

  return (
    <Switch>
      <Route exact path={publicRoutes}>
        <PublicLayout>
          <Route exact path="/" component={LandingPage}></Route>
        </PublicLayout>
      </Route>
      <Route exact path={dashboardRoutes}>
        <DashboardLayout>
          <Route exact path="/dashboard" component={HomePage}></Route>
          <Route exact path="/dashboard/patients" component={PatientsPage}></Route>
          <Route exact path="/dashboard/plans" component={PlansPage}></Route>
          <Route exact path="/dashboard/sessions" component={SessionsPage}></Route>
          <Route exact path="/dashboard/profile" component={ProfilePage}></Route>
        </DashboardLayout>
      </Route>
      <Route exact component={NotFound}></Route>
    </Switch>
  );
}

export default App;
