import { DropDownProps } from 'antd/lib/dropdown';
import * as React from 'react';

export interface IHeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
}

export default class HeaderDropdown extends React.Component<IHeaderDropdownProps, any> {}
