import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';

import Students from '~/pages/students';
import addStudents from '~/pages/students/addStudents';
import updateStudents from '~/pages/students/updateStudents';

import Plans from '~/pages/plans';
import addPlans from '~/pages/plans/addPlans';
import updatePlans from '../pages/plans/updatePlans';

import Registrations from '~/pages/registrations';
import addRegistrations from '~/pages/registrations/addRegistrations';
import updRegistrations from '../pages/registrations/updRegistrations';

import HelpOrders from '~/pages/help_orders';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />

        <Route exact path="/students" component={Students} isPrivate />
        <Route
          exact
          path="/students/create"
          component={addStudents}
          isPrivate
        />
        <Route
          exact
          path="/students/:id"
          component={updateStudents}
          isPrivate
        />

        <Route exact path="/plans" component={Plans} isPrivate />
        <Route exact path="/plans/create" component={addPlans} isPrivate />
        <Route exact path="/plans/:id" component={updatePlans} isPrivate />

        <Route
          exact
          path="/registrations"
          component={Registrations}
          isPrivate
        />
        <Route
          exact
          path="/registrations/create"
          component={addRegistrations}
          isPrivate
        />
        <Route
          exact
          path="/registrations/:id"
          component={updRegistrations}
          isPrivate
        />

        <Route path="/help_orders" component={HelpOrders} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
