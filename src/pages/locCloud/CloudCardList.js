import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { LinkOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import Link from 'umi/link';

import CardList from '@/locComponents/CardList';
// import socket from '@/utils/socketIo';
import Status from '@/locComponents/Status';
import styles from './CloudCardList.less';

@connect(({ cloud, loading }) => ({
  list: cloud.clouds,
  loading: loading.models.list,
}))
class CloudCardList extends PureComponent {
  notify(data) {
    notification.open({
      key: 'notification',
      message: 'Message',
      description: data,
    });
  }
  componentDidMount() {
    // socket.on('notification', this.notify);
    const { dispatch, location } = this.props;
    dispatch({
      type: 'cloud/fetchClouds',
    });
  }
  componentWillUnmount() {
    // socket.removeListener('notification', this.notify);
  }
  render() {
    const { loading, list } = this.props;
    const actions = (item) => {
      return [<Link to={`/cloud/${item.cloud_id}`}>More details</Link>];
    };
    const content = (item) => {
      return (
        <Fragment>
          <p>
            Health
            <Status status={item.health} />
          </p>
          <p>
            Deployment
            <Status status={item.deployment} />
          </p>
          <p>
            Horizon{' '}
            <a href={item.horizon} target="_blank">
              <LinkOutlined />
            </a>
          </p>
        </Fragment>
      );
    };
    return (
      <CardList
        loading={loading}
        listdata={list}
        actions={actions}
        content={content}
        avatar="cloud"
      />
    );
  }
}

export default CloudCardList;
