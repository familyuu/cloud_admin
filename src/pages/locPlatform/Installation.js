import React, { Component } from 'react';
import { connect } from 'dva';

import BasicList from '@/locComponents/BasicList';

class InstallationList extends Component {
  componentDidMount() {
    const {
      dispatch,
      location,
    } = this.props;

    dispatch({
      type: 'platform/fetchInstallation',
      payload: {},
    });
  }
  render() {
    const {
      list,
      loading
    } = this.props;
    return (
      <BasicList listTitle="Hardware Management Service"
                 list={list}
                 loading={loading} />
    );
  }
}

const mapStateToProps = ({ platform, loading }) => ({
  list: platform.installation,
  loading: loading.models.platform,
});
export default connect(mapStateToProps)((props) => <InstallationList {...props} />);