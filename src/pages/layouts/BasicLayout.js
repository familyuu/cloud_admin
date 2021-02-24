import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';

import logo from '../../assets/logo.svg';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';

import MenuContext from './MenuContext';
import Footer from './Footer';
import Header from './Header';

import styles from './BasicLayout.less';

const { Content } = Layout;

const mediaQuery = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
        username: sessionStorage.getItem('loc-user') || '',
      }
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/generateMenuData',
      payload: { routes, authority },
    });
  }

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  render() {
    const { children, location, navTheme,  menuData, breadcrumbNameMap } = this.props;
    const layout = (
      <Layout>
        <SiderMenu logo={logo}
                   theme={navTheme}
                   onCollapse={this.handleMenuCollapse}
                   menuData={menuData}
                   {...this.props} />
        <Layout style={{ minHeight: '100vh' }}>
          <Header menuData={menuData}
                  handleMenuCollapse={this.handleMenuCollapse}
                  logo={logo}
                  {...this.props} />
          <Content className={styles.content}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );

    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(location.pathname, breadcrumbNameMap)}>
          <ContainerQuery query={mediaQuery}>
            {params => (
              <MenuContext.Provider value={{ breadcrumbNameMap, location }}>
                <div className={classNames(params)}>
                  {layout}
                </div>
              </MenuContext.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ global, user, setting, menu: menuModel }) => {
  return ({
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    layout: setting.layout,
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
    ...setting,
  });
};

export default connect(mapStateToProps)(props => <BasicLayout {...props} />);
