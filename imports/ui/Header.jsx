import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import M from 'materialize-css';
import Blaze from 'meteor/gadicc:blaze-react-component';

class Header extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, {});
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className={this.props.backgroundColor} role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="/" className="brand-logo fix-content">
              {this.props.title}
            </a>

            <ul className="right hide-on-med-and-down">
              {this.props.currentUser ? (
                <React.Fragment>
                  <li>Hi, {this.props.currentUser.profile.displayName}!</li>
                  <li>
                    <Blaze template="atNavButton" />
                  </li>
                </React.Fragment>
              ) : (
                <li>
                  <Link to="/signin" className="waves-effect waves-light btn">
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
  }
}

export default HeaderContainer = withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(Header);
