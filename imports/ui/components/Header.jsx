import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import M from 'materialize-css';
import Blaze from 'meteor/gadicc:blaze-react-component';

const Header = props => {
  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  });

  const routes = [
    { label: 'Expenses', to: '/expenses' },
    { label: 'Accounts', to: '/accounts' }
  ];

  return (
    <div className="navbar-fixed">
      <nav className={props.backgroundColor} role="navigation">
        <div className="nav-wrapper container">
          <Link id="logo-container" to="/" className="brand-logo fix-content">
            {props.title}
          </Link>

          <ul className="right hide-on-med-and-down">
            {props.currentUser ? (
              <React.Fragment>
                {routes.map(route => (
                  <li key={route.to}>
                    <Link to={route.to}>{route.label}</Link>
                  </li>
                ))}
                <li>Hi, {props.currentUser.profile.displayName}!</li>
                <li>
                  <Blaze template="atNavButton" />
                </li>
              </React.Fragment>
            ) : (
              <li>
                <Link to="/signin" className="btn">
                  Sign in
                </Link>
              </li>
            )}
          </ul>

          <ul id="nav-mobile" className="sidenav">
            <li>
              <a className="sidenav-close" href="/">
                Scripts
              </a>
            </li>

            <li>
              <Blaze template="atNavButton" />
            </li>
          </ul>

          <a href="#" data-target="nav-mobile" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default HeaderContainer = withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(Header);
