import React, { Component } from 'react';
import { connect } from 'dva';

import BasicList from '@/locComponents/BasicList';

class RepositoryList extends Component {
  componentDidMount() {
    const {
      dispatch,
      location,
    } = this.props;

    dispatch({
      type: 'platform/fetchRepository',
      payload: {},
    });
  }
  render() {
    const {
      list,
      loading
    } = this.props;
    return (
      <BasicList listTitle="Configuration Repository Service"
                 list={list}
                 loading={loading} />
    );
  }
}

const mapStateToProps = ({ platform, loading }) => ({
  list: platform.repository,
  loading: loading.models.platform,
});
export default connect(mapStateToProps)((props) => <RepositoryList {...props} />);