import React, { PureComponent, createElement } from 'react';
import { Breadcrumb } from 'antd';
import pathToRegexp from 'path-to-regexp';

import { urlToList } from '../_utils/pathTools';

import styles from './index.less';

const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

export default class BreadcrumbView extends PureComponent {
  /**
   * generate breadcrumbs list
   */
  generateBreadcrumbList = () => {
    const { routes, params, location, breadcrumbNameMap } = this.props;
    if (routes && params) {
      return (
        <Breadcrumb className={styles.breadcrumb}
                    routes={routes.filter((route) => route.breadcrumbName)}
                    params={params}
                    itemRender={this.itemRender} />
      );
    }
    if (location && location.pathname) {
      return this.conversionFromLocation(location, breadcrumbNameMap);
    }
    return null;
  };

  conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
    const { breadcrumbSeparator, home, itemRender, linkElement = 'a' } = this.props;
    // Convert the url to an array
    const pathSnippets = urlToList(routerLocation.pathname);
    // Loop data mosaic routing
    const breadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }
      const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
      const name = itemRender ? itemRender(currentBreadcrumb) : currentBreadcrumb.name;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {createElement(
            isLinkable ? linkElement : 'span',
            { [linkElement === 'a' ? 'href' : 'to']: `#${url}` },
            name
          )}
        </Breadcrumb.Item>
      ) : null;
    });
    // Add home breadcrumbs to your head if defined
    if (home) {
      breadcrumbItems.unshift(
        <Breadcrumb.Item key="home">
          {createElement(
            linkElement,
            {
              [linkElement === 'a' ? 'href' : 'to']: '/',
            },
            home
          )}
        </Breadcrumb.Item>
      );
    }
    return breadcrumbItems;
  };

  render() {
    const { breadcrumbSeparator } = this.props;
    return (
      <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
        {this.generateBreadcrumbList()}
      </Breadcrumb>
    );
  }
}
