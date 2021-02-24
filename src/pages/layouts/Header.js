import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, message } from 'antd';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import Animate from 'rc-animate';

import GlobalHeader from '@/components/GlobalHeader';

const { Header } = Layout;

class HeaderView extends Component {
  state = {
    visible: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { collapsed, setting } = this.props;
    const { layout } = setting;
    if (layout === 'sidemenu' || layout === 'topmenu') {
      return '100%';
    }
  };

  handleNoticeClear = (type) => {
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
        id: `component.globalHeader.${type}`,
      })}`
    );
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      router.push('/account/profile/basic');
      return;
    }
    if (key === 'userSetting') {
      router.push('/account/profile/settings');
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  render() {
    const { handleMenuCollapse, setting } = this.props;
    const { navTheme, layout } = setting;
    const { visible } = this.state;
    const width = this.getHeadWidth();
    const HeaderDom = (
      <Header style={{ padding: 0, width }}>
        <GlobalHeader onCollapse={handleMenuCollapse}
                      onNoticeClear={this.handleNoticeClear}
                      onMenuClick={this.handleMenuClick}
                      onNoticeVisibleChange={this.handleNoticeVisibleChange}
                      {...this.props} />
      </Header>
    );
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

const mapStateToProps = ({ user, global, setting, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  setting,
});
export default connect(mapStateToProps)(HeaderView);
