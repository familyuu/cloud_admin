import React from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';

import { getRouteAuthority } from '@/utils/authority';
import Authorized from '@/utils/Authorized';
import Exception403 from '@/pages/Exception/403';

function Authorization({ children, location, routerData }) {
  const loggedAuth = sessionStorage.getItem('loc-authority') || '';
  const isAuthMatched = loggedAuth && loggedAuth !== 'guest';
  return (
    <Authorized routeAuthority={getRouteAuthority(location.pathname, routerData)}
                noMatch={<Exception403 />}>
      {children}
    </Authorized>
  );
}
export default connect(({ menu: menuModel }) => ({
  routerData: menuModel.routerData,
}))(Authorization);
