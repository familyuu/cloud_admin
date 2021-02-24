import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Upload, Select, Button, Spin } from 'antd';
import { connect } from 'dva';
import GeographicView from './GeographicView';
import styles from './Settings.less';

const FormItem = Form.Item;
const { Option } = Select;
const placeholderMap = {
  oldPassword: 'Please input your password.',
  newPassword: 'Please input a new password.',
  password: 'Please confirm your new password.',
};
const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const checkOldPasswd = (passwd) => (rule, value, callback) => {
  if (passwd !== value) {
    callback('Invalid password!');
  }
  callback();
};
const checkNewPasswd = (newPassword) => (rule, value, callback) => {
  const confirmpassword = value;
  const newpassword = newPassword;
  if (confirmpassword !== newpassword) {
    callback('Please input same password!');
  }
  callback();
};

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar, handleChange }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload name="avatar" showUploadList={false} onChange={handleChange}>
      <div className={styles.button_view}>
        <Button icon={<UploadOutlined />}>
          <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" />
        </Button>
      </div>
    </Upload>
  </Fragment>
);

//Modify password component
const passwordModifyItems = (getFieldDecorator, getFieldValue, oldPassword) => {
  return (
    <Fragment>
      <FormItem label="password" key="oldPassword">
        {getFieldDecorator('oldPassword', {
          validatorTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              message: 'Please input your password',
            },
            {
              validator: checkOldPasswd(oldPassword),
            },
          ],
        })(<Input.Password type="password" placeholder={placeholderMap['oldPassword']} />)}
      </FormItem>
      <FormItem label="New password" key="newPassword">
        {getFieldDecorator('newPassword', {
          validatorTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              message: 'Please input a new password',
            },
          ],
        })(<Input.Password type="password" placeholder={placeholderMap['newPassword']} />)}
      </FormItem>
      <FormItem label="Confirm password" key="password">
        {getFieldDecorator('password', {
          validatorTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              message: 'Please confirm your new password',
            },
            {
              validator: checkNewPasswd(getFieldValue('newPassword')),
            },
          ],
        })(<Input.Password type="password" placeholder={placeholderMap['password']} />)}
      </FormItem>
    </Fragment>
  );
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModifyPassword: false,
      isModifying: false,
    };
  }

  componentDidMount() {
    this.setDefaultFields();
  }

  modifyPassword = () => {
    const { isModifyPassword } = this.state;
    this.setState({
      isModifyPassword: !isModifyPassword,
    });
  };

  handleAvatarChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        console.log(imageUrl);
        this.setState({
          imageUrl,
        });
      });
    }
  };

  getRef = (ref) => {
    this.Root = ref;
  };

  setDefaultFields = () => {
    const { currentUser, form } = this.props;
    Object.keys(form.getFieldsValue())
      .filter((key) => {
        return key !== 'password';
      })
      .forEach((key) => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    this.setState({
      imageUrl: currentUser.avatar,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { currentUser, form, dispatch } = this.props;
    const { isModifyPassword } = this.state;
    this.setState({
      isModifying: true,
    });

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (isModifyPassword) {
          sessionStorage.removeItem('loc-user');
        } else {
          sessionStorage.setItem('loc-user', values && values.name);
        }
        dispatch({
          type: 'user/modifyCurrent',
          payload: {
            oldname: currentUser.name,
            avatar: this.state.imageUrl,
            ...values,
          },
        });
      }
    });
  };

  render() {
    const {
      currentUser: { password },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { isModifyPassword, imageUrl, isModifying } = this.state;

    return (
      <div className={styles.setting} ref={this.getRef}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label={formatMessage({ id: 'app.settings.nickname' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.email-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'app.settings.group' })}>
              {getFieldDecorator('group', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.group-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            {/* <FormItem label={formatMessage({ id: 'app.settings.profile' })}>
              {getFieldDecorator('profile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.profile-message' }, {}),
                  },
                ],
              })(
                <Input.TextArea placeholder={formatMessage({ id: 'app.settings.profile-placeholder' })}
                  rows={4} />
              )}
            </FormItem> */}
            {/* <FormItem label={formatMessage({ id: 'app.settings.country' })}>
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.country-message' }, {}),
                  },
                ],
              })(
                <Select style={{ maxWidth: 220 }}>
                  <Option value="China">中国</Option>
                </Select>
              )}
            </FormItem> */}
            {/* <FormItem label={formatMessage({ id: 'app.settings.geographic' })}>
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.geographic-message' }, {}),
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem> */}
            {/* <FormItem label={formatMessage({ id: 'app.settings.address' })}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.settings.address-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem> */}
            {isModifyPassword
              ? passwordModifyItems(getFieldDecorator, getFieldValue, password)
              : null}
            <FormItem>
              <Button type="dashed" onClick={this.modifyPassword}>
                <PlusOutlined /> {isModifyPassword ? 'Cancel Modify Password' : 'Modify Password'}
              </Button>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                <Spin spinning={isModifying}>
                  <FormattedMessage id="app.settings.update" defaultMessage="Update Information" />
                </Spin>
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={imageUrl} handleChange={this.handleAvatarChange} />
        </div>
      </div>
    );
  }
}

export default Settings;
