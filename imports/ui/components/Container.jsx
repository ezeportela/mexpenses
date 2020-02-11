import React from 'react';

export default Container = props => (
  <div className="container">
    <div className="section">{props.children}</div>
  </div>
);
