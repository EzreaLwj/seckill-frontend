import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {message, Tabs} from 'antd';
import React, { useState } from 'react';
// import { PLANET_LINK, SYSTEM_LOGO } from '@/constants';
import Footer from '@/components/Footer';
import styles from './index.less';
import { LoginForm, ProFormText,ProFormSelect } from '@ant-design/pro-form';
import {ProFormDatePicker} from "@ant-design/pro-components";
import {userRegisterUsingPOST} from "@/services/mall-user/userController";
import {history} from "@@/core/history";
import {useModel} from "@@/exports";

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  // 表单提交
  const handleSubmit = async (values: API.UserRegisterReq) => {

    try {
      // 注册
      const msg = await userRegisterUsingPOST(values);
      if (msg.code === '210' ) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        window.localStorage.setItem('userId', msg.data.id)
        /** 此方法会跳转到 redirect 参数所在的位置 */
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        setInitialState({
          loginUser: msg.data
        });
        return;
      }
      message.error("注册失败")
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          title="用户注册"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            console.log(values)
            await handleSubmit(values as API.UserRegisterReq);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'}/>
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText
                name="phone"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入手机号码"
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入邮箱地址"
              />
              <ProFormDatePicker
                name="birthday"
                placeholder="生日"
                fieldProps={{
                  size: 'large'
                }}
              />
              <ProFormSelect
                options={[
                  {
                    value: '0',
                    label: '男',
                  },
                  {
                    value: '1',
                    label: '女',
                  },
                ]}
                fieldProps={{
                  size: 'large'
                }}
                name="gender"
                placeholder="性别"
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
