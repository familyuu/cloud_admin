import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import Link from 'umi/link';

import CardList from '@/locComponents/CardList';
import Credential from '@/locComponents/Credential';

@connect(({ ceph, loading }) => ({
  list: ceph.clusters,
  loading: loading.models.ceph,
}))
class CephCardList extends PureComponent {
  componentDidMount() {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'ceph/fetchClusters',
    });
  }
  render() {
    const { loading, list } = this.props;

    const actions = (item) => {
      return [<Link to={`/storage/ceph/${item.cluster_id}`}>More details</Link>];
    };
    const content = (item) => {
      return (
        <Fragment>
          <p>
            Dashboard{' '}
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <Icon type="link" />
            </a>
          </p>
          <p>
            Credential <Credential credential={item.credential} />
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
        avatar="cluster"
      />
    );
  }
}

export default CephCardList;
