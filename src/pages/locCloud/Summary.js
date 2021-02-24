import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import getPercent from '../../utils/getPercent';
import BasicList from '@/locComponents/BasicList';
import Pie from '@/locComponents/Charts/Pie';
import GBunit from '@/locComponents/Charts/gbunit';
import styles from './Summary.less';

@connect(({ cloud, loading }) => ({
  cloud,
  loading: loading.effects['cloud/fetchCloud'],
}))
class Summary extends Component {

  render() {
    const {
      loading,
      cloud: { summary },
    } = this.props;
    const { list, utilization } = summary;
    return (
      <Fragment>
        <div className={styles.summaryList}>
          <BasicList loading={loading}
                     list={list} />
        </div>
        {
          loading 
          ? null
          : <Row align="middle"
                 justify="space-around"
                 type="flex">
              {/* <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <h4 className={styles.pieTitle}><FormattedMessage id="app.cloud.summary.vm" defaultMessage="VM" /></h4>
                <Pie subTitle={`${utilization.vm.used}/${utilization.vm.total}`}
                    animate={false}
                    color='rgba(24, 144, 255, 0.65)'
                    inner={0.65}
                    tooltip={false}
                    margin={[0, 0, 0, 0]}
                    percent={getPercent(utilization.vm.used, utilization.vm.total)}
                    height={150}
                    lineWidth={4} />
              </Col> */}
              <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <h4 className={styles.pieTitle}>
                  <FormattedMessage id="app.cloud.summary.storage" defaultMessage="Storage" />
                </h4>
                <Pie subTitle={
                       <span>
                         <GBunit>{utilization.storage.used}</GBunit>/
                         <GBunit>{utilization.storage.total}</GBunit>
                       </span>
                    }
                    animate={false}
                    color='rgba(24, 144, 255, 0.65)'
                    inner={0.65}
                    tooltip={false}
                    margin={[0, 0, 0, 0]}
                    percent={getPercent(utilization.storage.used, utilization.storage.total)}
                    height={150}
                    lineWidth={4} />
              </Col>
              <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <h4 className={styles.pieTitle}>
                  <FormattedMessage id="app.cloud.summary.memory" defaultMessage="Memory" />
                </h4>
                <Pie subTitle={
                       <span>
                         <GBunit>{utilization.memory.used}</GBunit>/
                         <GBunit>{utilization.memory.total}</GBunit>
                       </span>
                     }
                     animate={false}
                     color='rgba(24, 144, 255, 0.65)'
                     inner={0.65}
                     tooltip={false}
                     margin={[0, 0, 0, 0]}
                     percent={getPercent(utilization.memory.used, utilization.memory.total)}
                     height={150}
                     lineWidth={4} />
              </Col>
              <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <h4 className={styles.pieTitle}>
                  <FormattedMessage id="app.cloud.summary.vcpu" defaultMessage="VCPU" />
                </h4>
                <Pie subTitle={`${utilization.vcpu.used}/${utilization.vcpu.total}`}
                    animate={false}
                    color='rgba(24, 144, 255, 0.65)'
                    inner={0.65}
                    tooltip={false}
                    margin={[0, 0, 0, 0]}
                    percent={getPercent(utilization.vcpu.used, utilization.vcpu.total)}
                    height={150}
                    lineWidth={4} />
              </Col>
            </Row>
        }
        
      </Fragment>
    );
  }
}

export default Summary;
