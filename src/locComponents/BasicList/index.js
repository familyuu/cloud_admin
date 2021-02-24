import React, { PureComponent, Fragment } from 'react';
import { List, Card } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
import Credential from '@/locComponents/Credential';
import styles from './index.less';

class BasicList extends PureComponent {
  render() {
    const {
      list,
      loading,
      listTitle
    } = this.props;

    const ListContent = ({ data: { value, link, hide } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
        {
          link ? <a href={link} target="_blank">{`${value}`}</a>
               : (hide ? <Credential credential={value} /> : <p>{value}</p>)
        }
        </div>
      </div>
    );

    return (
      <div className={styles.standardList}>
        <Card className={styles.listCard}
              bordered={false}
              title={listTitle}
              bodyStyle={{ padding: '0 30px' }}>
          <List size="small"
                rowKey="id"
                loading={loading}
                dataSource={list}
                renderItem={(item) => (
                  <List.Item>
                  <List.Item.Meta title={<FormattedMessage id={`app.list.${item.title}`} defaultMessage={item.title} />} />
                    <ListContent data={item} />
                  </List.Item>
                )} />
        </Card>
      </div>
    );
  }
}

export default BasicList;
