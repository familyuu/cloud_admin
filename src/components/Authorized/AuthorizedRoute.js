import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthComponent from './index';

// TODO: umi只会返回render和rest
const AuthorizedRoute = ({ component: Component, render, authority, redirectPath, ...rest }) => (
  <AuthComponent authority={authority}
                 noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}>
    <Route {...rest} render={(props) => (Component ? <Component {...props} /> : render(props))} />
  </AuthComponent>
);

export default AuthorizedRoute;
