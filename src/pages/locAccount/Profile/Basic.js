import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { MailOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Avatar, Divider } from 'antd';
import styles from './Basic.less';

@connect(({ loading, user }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Basic extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
        username: sessionStorage.getItem('loc-user'),
      },
    });
  }
  render() {
    const { currentUser, currentUserLoading } = this.props;
    return (
      <Card bordered={false} className={styles.mainCard} loading={currentUserLoading}>
        {currentUser && Object.keys(currentUser).length ? (
          <div>
            <div className={styles.avatarHolder}>
              <img alt="avatar" src={currentUser.avatar} />
              <div className={styles.name}>{currentUser.name}</div>
            </div>
            <div className={styles.detail}>
              <p>
                <UserOutlined style={{ marginRight: 10 }} />
                {currentUser.identity}
              </p>
              <p>
                <MailOutlined style={{ marginRight: 10 }} />
                {currentUser.email}
              </p>
              <p>
                <TeamOutlined style={{ marginRight: 10 }} />
                {currentUser.group}
              </p>
              {/* <p>
                <Icon type="environment" style={{ marginRight: 10 }}/>
                {currentUser.geographic.province.label}
                {currentUser.geographic.city.label}
              </p> */}
            </div>
            <Divider dashed />
          </div>
        ) : (
          'loading...'
        )}
      </Card>
    );
  }
}

export default Basic;
