import React from 'react';
import PromiseRender from './PromiseRender';
import { LOGGEDINAUTHORITY } from './updateLoggedAuth';

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } authority
 * @param { 你的权限 | Your permission description } currentAuthority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
const CheckPermissions = (routeAuthority, currentAuthority, target, Exception) => {
  // Retirement authority, return target;
  if (!routeAuthority) {
    return target;
  }
  // routeAuthority is array
  if (Array.isArray(routeAuthority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => routeAuthority.includes(item))) {
        return target;
      }
    } else if (routeAuthority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }
  // routeAuthority is string
  if (typeof routeAuthority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => routeAuthority === item)) {
        return target;
      }
    } else if (routeAuthority === currentAuthority) {
      return target;
    }
    return Exception;
  }
  // routeAuthority is Promise
  if (routeAuthority instanceof Promise) {
    return <PromiseRender ok={target} error={Exception} promise={routeAuthority} />;
  }
  // routeAuthority is function
  if (typeof routeAuthority === 'function') {
    try {
      const bool = routeAuthority(currentAuthority);
      if (bool instanceof Promise) {
        return <PromiseRender ok={target} error={Exception} promise={bool} />;
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { CheckPermissions };

const checkPermissions = (routeAuthority, target, Exception) =>
  CheckPermissions(routeAuthority, LOGGEDINAUTHORITY, target, Exception);

export default checkPermissions;
