import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import styles from './index.less';
import LoginContext from './loginContext';

class Login extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);
  }

  getContext = () => {
    const { form } = this.props;
    return { form };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields(['userName', 'password'], { force: true }, (err, values) => {
      onSubmit(err, values);
    });
  };

  render() {
    const { className, children } = this.props;
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>{children}</Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

export default Form.create()(Login);
