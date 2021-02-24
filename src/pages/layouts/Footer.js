import React, { Fragment } from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>Open Cloud
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
