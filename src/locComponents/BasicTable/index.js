import React, { memo } from 'react';
import { Card, Table } from 'antd';
import { FormattedMessage } from 'umi/locale';
import style from './index.less';

const basicTable = memo(
  ({
    tableTitle,
    tableData,
    columns,
    loading,
    pageSize,
    pageTotal,
    currentPage,
    handleTableChange,
    onRowSelect,
    selectType,
    selectedRowKeys,
  }) => {
    const pagination = pageSize
      ? {
        style: { marginBottom: 0 },
        pageSize,
        total: pageTotal,
        current: currentPage,
      }
      : false;

    const rowSelection = onRowSelect
      ? {
        selectedRowKeys,
        onChange: onRowSelect,
        type: selectType || 'checkbox',
      }
      : null;
      
    return (
      <div className={style.basicTable}>
        {
          tableTitle
            ? (<h4>{tableTitle}</h4>)
            : null
        }
        <Table bordered={false}
               loading={loading}
               rowKey={(record, index) => index}
               size="middle"
               columns={columns}
               dataSource={tableData}
               pagination={pagination}
               onChange={handleTableChange}
               rowSelection={rowSelection} />
      </div>

    );
  }
);

export default basicTable;
