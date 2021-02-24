import React, { PureComponent } from 'react';
import { ScanOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Card, List } from 'antd';
import Link from 'umi/link';

import styles from './index.less';

const defaultActions = (item) => {
  return [
    <Link to={item.redirect}>
      <ScanOutlined style={{ fontSize: '20px', color: '#08c' }} />
    </Link>,
  ];
};
class CardList extends PureComponent {
  render() {
    const { loading, listdata, actions, content, avatar } = this.props;

    return (
      <div className={styles.cardList}>
        <List
          rowKey="id"
          loading={loading}
          grid={{ gutter: 24, xxl: 4, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={listdata.filter((item) => item)}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card
                hoverable
                className={styles.card}
                actions={actions ? actions(item) : defaultActions(item)}>
                <Card.Meta
                  title={item.name}
                  avatar={
                    <LegacyIcon
                      type={avatar}
                      style={{ fontSize: '2rem', color: 'rgba(24, 144, 255, 0.85)' }}
                    />
                  }
                  description={typeof content === 'function' ? content(item) : null}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CardList;
