import React from 'react';
import Header from './Header';
export default Layout = props => (
  <React.Fragment>
    <Header title="expenses" backgroundColor="green" />
    {props.children}
  </React.Fragment>
);
