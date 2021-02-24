import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tag, Progress } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import BasicTable from '@/locComponents/BasicTable';
import Status from '@/locComponents/Status';
import GBunit from '@/locComponents/Charts/gbunit';

const columns = [
  {
    title: <FormattedMessage id="app.cloud.name" defaultMessage="Name" />,
    dataIndex: 'name',
    key: 'name',
    render: (name) => `${name}`,
    width: '10%',
  },
  {
    title: <FormattedMessage id="app.cloud.type" defaultMessage="Type" />,
    dataIndex: 'type',
    key: 'type',
    render: (text) => `${text}`,
    width: '5%',
  },
  {
    title: <FormattedMessage id="app.cloud.bmcip" defaultMessage="BMC-IP" />,
    dataIndex: 'bmcip',
    key: 'bmcip',
    render: (text) => `${text}`,
    width: '10%',
  },
  {
    title: <FormattedMessage id="app.cloud.status" defaultMessage="Status" />,
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      return status === 'up' ? (<Tag color="#87d068">{status}</Tag>) : (<Tag color="#333333">{status}</Tag>);
    },
    width: '8%',
  },
  {
    title: <FormattedMessage id="app.cloud.cpu" defaultMessage="Cpu" />,
    dataIndex: 'cpu',
    key: 'cpu',
    render: (number) => `${number}`,
    width: '8%',
  },
  {
    title: <FormattedMessage id="app.cloud.memoryTotal" defaultMessage="Memory Total" />,
    dataIndex: 'memory_total',
    key: 'memory_total',
    render: (number) => (<GBunit>{number}</GBunit>),
    width: '10%',
  },
  {
    title: <FormattedMessage id="app.cloud.memoryUsage" defaultMessage="Memory Usage" />,
    dataIndex: 'memory_usage',
    key: 'memory_usage',
    render: (number) => (<Progress percent={number} size='small' />),
  },
];

@connect(({ cloud, loading }) => ({
  cloud,
  loading: loading.effects['cloud/fetchCloud'],
}))
class Infrastructure extends Component {
  state = {
    selectedRowKeys: [],
  };

  onRowSelect = (selectedRowKeys, selectedRows) => {
    console.log(`${selectedRowKeys},${selectedRows}`);
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      loading,
      cloud: { infrastructure },
    } = this.props;
    return (
      <Fragment>
        <BasicTable
          tableTitle="Cloud Nodes"
          tableData={infrastructure}
          columns={columns}
          loading={loading}
          onRowSelect={this.onRowSelect}
          selectedRowKeys={this.state.selectedRowKeys} />
      </Fragment>
    );
  }
}

export default Infrastructure;
