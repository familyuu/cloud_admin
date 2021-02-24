import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';

const DirTree = React.lazy(() => import('@/locComponents/DirTree'));
@connect(({ cloud, loading }) => ({
  cloud,
  loading: loading.effects['cloud/fetchCloud'],
}))
class Configuration extends Component {
  state = {
    selectedRowKeys: [],
  };

  render() {
    const {
      loading,
      cloud: { configuration },
    } = this.props;
    return (
      <Suspense fallback={null}>
        <h4 style={{padding: '0 16px'}}>Configuration files:</h4>
        <DirTree TreeData={configuration} />
      </Suspense>
    );
  }
}

export default Configuration;
