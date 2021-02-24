import React, { Component } from 'react';
import { connect } from 'dva';

import BasicList from '@/locComponents/BasicList';

class InventoryList extends Component {
  componentDidMount() {
    const {
      dispatch,
      location,
    } = this.props;

    dispatch({
      type: 'platform/fetchInventory',
      payload: {},
    });
  }
  render() {
    const {
      list,
      loading
    } = this.props;
    return (
      <BasicList listTitle="Inventory Service"
                 list={list}
                 loading={loading} />
    );
  }
}

const mapStateToProps = ({ platform, loading }) => ({
  list: platform.inventory,
  loading: loading.models.platform,
});
export default connect(mapStateToProps)((props) => <InventoryList {...props} />);