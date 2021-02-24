import React, { Suspense, Fragment } from 'react';
import { Card, Tag, Row, Col, Progress, Spin } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Brain.less';
import BasicTable from '@/locComponents/BasicTable';
import Pie from '@/locComponents/Charts/Pie';
import GBunit from '@/locComponents/Charts/gbunit';

const columns = [
  {
    title: <FormattedMessage id="app.dashboard.name" defaultMessage="Name" />,
    dataIndex: 'name',
    key: 'name',
    render: (name) => `${name}`,
    width: '8%',
  },
  {
    title: <FormattedMessage id="app.dashboard.hostIp" defaultMessage="Host IP" />,
    dataIndex: 'hostip',
    key: 'hostip',
    render: (ip) => `${ip}`,
    width: '5%',
  },
  {
    title: <FormattedMessage id="app.dashboard.status" defaultMessage="Status" />,
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      return status === 'up' ? (<Tag color="#87d068">{status}</Tag>) : (<Tag color="#333333">{status}</Tag>);
    },
    width: '5%',
  },
  {
    title: <FormattedMessage id="app.dashboard.vm" defaultMessage="VM" />,
    dataIndex: 'vm',
    key: 'vm',
    render: (number) => `${number}`,
    width: '5%',
  },
  {
    title: <FormattedMessage id="app.dashboard.memory" defaultMessage="Memory" />,
    dataIndex: 'memory',
    key: 'memory',
    render: (number) => (<Progress percent={number} size='small' />),
    width: '10%',
  },
  {
    title: <FormattedMessage id="app.dashboard.cpu" defaultMessage="CPU" />,
    dataIndex: 'cpu',
    key: 'cpu',
    render: (number) => (<Progress percent={number} size='small' />),
    width: '10%',
  }
];

const colors = value => {
  if (value === 'Used') {
    return '#F0F2F5';
  }
  return 'rgba(24, 144, 255, 0.65)';
};

const Brain = ({ clusters, utilization, loading }) => {
  const {
    cpu_usage,
    memory_usage,
    storage_usage 
  } = utilization;
  const memory = {
    total: memory_usage.total || 0,
    partation: [
      {
        x: 'Used',
        y: memory_usage.used || 0
      },
      {
        x: 'Remain',
        y: memory_usage.remain || 0
      }
    ]
  };
  const storage = {
    total: storage_usage.total || 0,
    partation: [
      {
        x: 'Used',
        y: storage_usage.used || 0
      },
      {
        x: 'Remain',
        y: storage_usage.remain || 0
      }
    ]
  };
  return (
    <Card title="Brain Cluster">
      <BasicTable loading={loading}
                  columns={columns}
                  tableData={clusters} />
      {
        loading
        ? <Spin />
        : <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <Pie hasLegend
                    subTitle={<FormattedMessage id="app.dashboard.cpu" defaultMessage="CPU usage" />}
                    total='100%'
                    percent={cpu_usage}
                    height={200}
                    lineWidth={4} />
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <Pie hasLegend
                    subTitle={<FormattedMessage id="app.dashboard.memory" defaultMessage="Memory" />}
                    total={() => (<GBunit>{memory.total}</GBunit>)}
                    data={memory.partation}
                    valueFormat={value => <GBunit>{value}</GBunit>}
                    colors={colors}
                    height={200}
                    lineWidth={4} />
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <Pie hasLegend
                    subTitle={<FormattedMessage id="app.dashboard.storage" defaultMessage="Storage" />}
                    total={() => (<GBunit>{storage.total}</GBunit>)}
                    data={storage.partation}
                    valueFormat={value => <GBunit>{value}</GBunit>}
                    colors={colors}
                    height={200}
                    lineWidth={4} />
            </Col>
          </Row>
      }
    </Card>
  );
};

export default Brain;