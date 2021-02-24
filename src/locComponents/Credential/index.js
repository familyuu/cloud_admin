import React, { Fragment } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button } from 'antd';

import styles from './index.less';

class Credential extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  triggerShow = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { credential } = this.props;
    return (
      <Fragment>
        <span className={styles.credential}>{this.state.show ? credential : '******'} </span>
        <Button
          size="small"
          className={styles.eyeButton}
          icon={<LegacyIcon type={this.state.show ? 'eye-invisible' : 'eye'} />}
          onClick={this.triggerShow}
        />
      </Fragment>
    );
  }
}

export default Credential;
