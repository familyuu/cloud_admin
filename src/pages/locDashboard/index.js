import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import styles from './index.less';
const Brain = React.lazy(() => import('./Brain'));
const Workload = React.lazy(() => import('./Workload'));

@connect(({ dashboard, loading }) => ({
  dashboard,
  loading: loading.effects['dashboard/fetch'],
}))
class locDashboard extends Component {
  
  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboard/fetch',
      });
    });
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    cancelAnimationFrame(this.reqRef);
  }

  render() {
    const {
      dashboard: {
        clusters,
        cloud_number,
        ceph_number,
        cpu_usage,
        memory_usage,
        storage_usage,
      },
      loading,
    } = this.props;
    
    const utilization = {cpu_usage, memory_usage, storage_usage};
    const workload = {ceph_number, cloud_number};

    return (
      <div className={styles.main}>
        <Suspense fallback={null}>
          <Brain clusters={clusters}
                 utilization={utilization}
                 loading={loading} />
        </Suspense>
        <Suspense fallback={null}>
          <Workload loading={loading}
                    workload={workload}/>
        </Suspense>
      </div>
    );
  }
}

export default locDashboard;
