import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { MinusOutlined } from '@ant-design/icons';
import { Divider, Button } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import BasicTable from '@/locComponents/BasicTable';

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
    width: '10%',
  },
  {
    title: <FormattedMessage id="app.cloud.mode" defaultMessage="Mode" />,
    dataIndex: 'mode',
    key: 'mode',
    render: (text) => (text ? `${text}` : <MinusOutlined />),
    width: '10%',
  },
  {
    title: <FormattedMessage id="app.cloud.vlanid" defaultMessage="Vlan-ID" />,
    dataIndex: 'vlanid',
    key: 'vlanid',
    render: (text) => `${text}`,
    width: '10%',
  },
  {
    title: <FormattedMessage id="app.cloud.subnet" defaultMessage="Subnet" />,
    dataIndex: 'subnet',
    key: 'subnet',
    render: (text) => (text ? `${text}` : <MinusOutlined />),
    width: '20%',
  },
  {
    title: <FormattedMessage id="app.cloud.operation" defaultMessage="Operation" />,
    key: 'operation',
    render: (text, record, index) => (
      <div>
        <a href="javascript:;">Operation1</a>
        <Divider type="vertical" />
        <a href="javascript:;">Operation2</a>
      </div>
    ),
  },
];

@connect(({ cloud, loading }) => ({
  cloud,
  loading: loading.models.cloud,
}))
class Networks extends Component {
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
      cloud: { network },
    } = this.props;
    return (
      <Fragment>
        <BasicTable
          tableTitle="Openstack Logic Networks"
          tableData={network}
          columns={columns}
          loading={loading}
          onRowSelect={this.onRowSelect}
          selectedRowKeys={this.state.selectedRowKeys}
        />
      </Fragment>
    );
  }
}

export default Networks;
