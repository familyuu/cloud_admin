import React, { Component, Suspense } from 'react';
import { Card, Icon, Row, Col } from 'antd';
import { connect } from 'dva';

// import TopologyCanvas from '@/locComponents/Charts/busTopology';

const Capacity = React.lazy(() => import('./Capacity'));
const TopologyCanvas = React.lazy(() => import('@/locComponents/Charts/busTopology'));

class CephDetail extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'ceph/fetchCluster',
      payload: {
        cephid: match.params.id,
      },
    });
  }

  render() {
    const { cluster, loading } = this.props;
    const { name, capacity, nodes } = cluster;
    return (
      <Card title={name} loading={loading}>
        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col xl={9} lg={6} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <Capacity capacity={capacity} title="Pysical capacity" />
            </Suspense>
          </Col>
          <Col xl={15} lg={18} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopologyCanvas nodes={nodes} title="Network" />
            </Suspense>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = ({ ceph: cephModel, loading }) => ({
  cluster: cephModel.cluster,
  loading: loading.effects['ceph/fetchCluster'],
});
export default connect(mapStateToProps)((props) => <CephDetail {...props} />);
