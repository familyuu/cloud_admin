import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/GridContent';
import styles from './index.less';

const { Item } = Menu;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class PersonalSet extends Component {
  state = {
    menuMode: 'inline',
    menuMap: {
      basic: <FormattedMessage id="app.settings.menuMap.basic" defaultMessage="Basic Information" />,
      settings: <FormattedMessage id="app.settings.menuMap.settings" defaultMessage="Settings" />,
    },
  };
  
  makeMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(menuKey => <Item key={menuKey}>{menuMap[menuKey]}</Item>);
  };

  menuChange = (e) => {
    router.push(`/account/profile/${e.key}`);
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let menuMode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        menuMode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        menuMode = 'horizontal';
      }
      this.setState({
        menuMode,
      });
    });
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'user/fetchCurrent',
    //   payload: {
    //     username: sessionStorage.getItem('loc-user'),
    //   }
    // });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    const { children, currentUser, location, match } = this.props;
    const { menuMode } = this.state;
    const defaultSelectKey = location.pathname.replace(`${match.url}/`, '');
    return (
      <GridContent>
        <div className={styles.main}
             ref={ref => {
               this.main = ref;
             }}>
          <div className={styles.leftmenu}>
            <Menu mode={menuMode}
                  selectedKeys={[defaultSelectKey]}
                  onClick={this.menuChange}>
              {this.makeMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
            <div className={styles.title}>{defaultSelectKey}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default PersonalSet;
