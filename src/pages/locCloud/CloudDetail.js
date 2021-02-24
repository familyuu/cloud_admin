import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Input, Tabs, Card } from 'antd';

@connect(({ cloud }) => ({
  cloud
}))
class CloudDetail extends Component {
  
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: 'cloud/fetchCloud',
      payload: {
        cloudid: match.params.id,
      },
    });
  }

  handleTabChange = (key) => {
    const { match } = this.props;
    switch (key) {
      case 'summary':
        router.push(`${match.url}/summary`);
        break;
      case 'infrastructure':
        router.push(`${match.url}/infrastructure`);
        break;
      case 'network':
        router.push(`${match.url}/network`);
        break;
      case 'configuration':
        router.push(`${match.url}/configuration`);
        break;
      default:
        break;
    }
  };

  render() {
    const { TabPane } = Tabs;
    const tabList = [
      {
        key: 'summary',
        tab: 'Summary',
      },
      {
        key: 'infrastructure',
        tab: 'Infrastructure',
      },
      {
        key: 'network',
        tab: 'Network',
      },
      {
        key: 'configuration',
        tab: 'Configuration',
      },
    ];

    const { match, children, location } = this.props;
    return (
      <Card>
        <Tabs
          size="large"
          activeKey={location.pathname.replace(`${match.url}/`, '')}
          onChange={this.handleTabChange}>
          {tabList.map((item) => (
            <TabPane tab={item.tab} key={item.key} />
          ))}
        </Tabs>
        {children}
      </Card>
    );
  }
}

export default CloudDetail;
