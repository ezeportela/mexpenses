import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Info from './Info';
import Signin from './Signin';

export default Router = props => (
  <BrowserRouter>
    <Layout currentUser={props.currentUser}>
      <Switch>
        <Route exact path="/" component={Info} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
