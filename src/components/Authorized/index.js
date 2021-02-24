import React from 'react';
import checkPermissions from './checkPermissions';

class AuthComponent extends React.Component {
  render() {
    const { children, routeAuthority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;

    return checkPermissions(routeAuthority, childrenRender, noMatch);
  }
}
export default AuthComponent;