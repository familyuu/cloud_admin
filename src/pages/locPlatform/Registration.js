import React, { Component } from 'react';
import { connect } from 'dva';

import BasicList from '@/locComponents/BasicList';

class RegistrationList extends Component {
  componentDidMount() {
    const {
      dispatch,
      location,
    } = this.props;

    dispatch({
      type: 'platform/fetchRegistration'
    });
  }
  render() {
    const {
      list,
      loading,
    } = this.props;
    return (
      <BasicList listTitle="Software Repo and Lifecycle Management Service"
                 list={list}
                 loading={loading} />
    );
  }
}

const mapStateToProps = ({ platform, loading }) => ({
  list: platform.registration,
  loading: loading.models.platform,
});
export default connect(mapStateToProps)((props) => <RegistrationList {...props} />);