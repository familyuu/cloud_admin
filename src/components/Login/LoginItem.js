import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import omit from 'omit.js';
import Items from './map';
import LoginSubmit from './LoginSubmit';
import LoginContext from './loginContext';

class WrapFormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    const { updateActive, name } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  getFormItemOptions = ({ rules, defaultRules }) => {
    const options = {
      rules: rules || defaultRules,
    };
    return options;
  };

  render() {
    const { count } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      name,
      rules,
      defaultProps,
      defaultRules,
      loginItemtype,
      updateActive,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};

    return (
      <Form.Item>
        {getFieldDecorator(name, options)(<Input {...defaultProps} {...otherProps} />)}
      </Form.Item>
    );
  }
}

const LoginItems = {};
LoginItems.Submit = LoginSubmit;
Object.keys(Items).forEach((key) => {
  const item = Items[key];
  LoginItems[key] = (props) => (
    <LoginContext.Consumer>
      {(context) => (
        <WrapFormItem
          {...props}
          defaultProps={item.props}
          defaultRules={item.rules}
          loginItemtype={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItems;
