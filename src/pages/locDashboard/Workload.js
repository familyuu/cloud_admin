import React from 'react';
import { ScanOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Card, List } from 'antd';
import Link from 'umi/link';

import styles from './Workload.less';

const MakeContent = (listItem) => {
  const { id, avatar, title, redirect, ...rest } = listItem;
  let reactNodeArray = Object.keys(rest) || [];

  reactNodeArray = reactNodeArray.map((key) => `${rest[key]} ${key}`);

  return reactNodeArray.length > 0
    ? reactNodeArray.reduce((prev, curr) => prev.concat(', ', curr))
    : 'No data';
};
class Workload extends React.Component {
  render() {
    const {
      workload: { ceph_number, cloud_number },
      loading,
    } = this.props;
    const listdata = [
      {
        id: 1,
        title: 'Cloud',
        avatar: 'cloud',
        redirect: '/cloud/basic',
        clouds: cloud_number || 0,
      },
      {
        id: 2,
        title: 'Container',
        avatar: 'deployment-unit',
        redirect: '/dashboard',
      },
      {
        id: 3,
        title: 'Storage',
        avatar: 'hdd',
        redirect: '/storage/ceph',
        ceph: ceph_number || 0,
      },
    ];
    return (
      <Card title="Workload" className={styles.workload}>
        <List
          rowKey="id"
          loading={loading}
          grid={{ gutter: 24, xxl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={listdata.filter((item) => item)}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card
                hoverable
                className={styles.card}
                actions={[
                  <Link to={item.redirect}>
                    <ScanOutlined style={{ fontSize: '20px', color: '#08c' }} />
                  </Link>,
                ]}>
                <Card.Meta
                  title={item.title}
                  avatar={
                    <LegacyIcon
                      type={item.avatar}
                      style={{ fontSize: '2rem', color: 'rgba(24, 144, 255, 0.85)' }}
                    />
                  }
                  description={MakeContent(item)}
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Workload;
