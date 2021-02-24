import React, { Component } from 'react';
import { connect } from 'dva';

import BasicList from '@/locComponents/BasicList';

class AutomationList extends Component {
  componentDidMount() {
    const {
      dispatch,
      location,
    } = this.props;

    dispatch({
      type: 'platform/fetchAutomation'
    });
  }
  render() {
    const {
      list,
      loading,
    } = this.props;
    return (
      <BasicList listTitle="Automation Service"
                 list={list}
                 loading={loading} />
    );
  }
}

const mapStateToProps = ({ platform, loading }) => ({
  list: platform.automation,
  loading: loading.models.platform,
});
export default connect(mapStateToProps)((props) => <AutomationList {...props} />);