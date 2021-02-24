import React, { PureComponent } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';

import BreadcrumbView from './breadcrumb';
import styles from './index.less';
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed, logo } = this.props;
    return (
      <div className={styles.header}>
        <span className={styles.trigger} onClick={this.toggle}>
          <LegacyIcon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        <BreadcrumbView {...this.props} />
        <RightContent {...this.props} />
      </div>
    );
  }
}
