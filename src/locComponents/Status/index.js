import React, { PureComponent } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';

const Status = ({ status }) => {
  switch (status) {
    case 'ok':
      return (
        <CheckCircleOutlined
          style={{ fontSize: 18, marginLeft: 5, marginRight: 5, color: 'rgb(47, 194, 91)' }}
        />
      );
    case 'warning':
      return (
        <WarningOutlined
          style={{ fontSize: 18, marginLeft: 5, marginRight: 5, color: 'rgb(250, 204, 20)' }}
        />
      );
    case 'error':
      return (
        <CloseCircleOutlined
          style={{ fontSize: 18, marginLeft: 5, marginRight: 5, color: 'rgb(240, 72, 100)' }}
        />
      );
    default:
      return (
        <WarningOutlined
          style={{ fontSize: 18, marginLeft: 5, marginRight: 5, color: 'rgb(250, 204, 20)' }}
        />
      );
  }
};

export default Status;
