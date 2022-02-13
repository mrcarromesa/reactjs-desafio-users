import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import Dashboard from '~/pages/Dashboard';
import ExportUsers from '~/pages/ExportUsers';

import RouteComponent from './RouteComponent';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" element={<RouteComponent component={Dashboard} />} />
    <Route path="/home" element={<RouteComponent component={Dashboard} />} />
    <Route
      path="/export-users"
      element={<RouteComponent component={ExportUsers} />}
    />
  </Switch>
);

export default Routes;
