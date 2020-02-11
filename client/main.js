import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from '../imports/ui/App';
import Projects from '../imports/ui/Projects';
import ListProjects from '../imports/ui/ListProjects';
import PublicProjects from '../imports/ui/PublicProject';

import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App}/>      
      <Route exact path="/projects/:id" component={Projects}/>           
      <Route exact path="/projects/list/:email" component={ListProjects}/>           
      <Route exact path="/public/projects/:id" component={PublicProjects}/>           
    </Switch>
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});