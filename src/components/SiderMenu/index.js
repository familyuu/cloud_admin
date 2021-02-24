import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

const SiderMenuWrapper = React.memo(props => {
  const { menuData } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return (
    <SiderMenu flatMenuKeys={flatMenuKeys}
               {...props} />
  );
});

export default SiderMenuWrapper;
