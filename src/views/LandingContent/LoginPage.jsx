import {React} from 'react';
import { Form, Input, Button, ConfigProvider, message } from 'antd';
import LogoIcon from '../../assets/common/logo-icon.png';
import '../../styles/views/LandingContent/LoginPage.css';
import { useAuth } from '../../authContext/AuthProvider';

const LoginPage = () => {
  const  auth = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  if(auth.isLogged) {
    window.location.href = '/'+auth.role.toLowerCase()+'/dashboard';
  }
  const onFinish = async (values) => {
    const { email, password } = values;
    console.log(email);
    try {
      const response = await auth.loginAction({ email, password });
      if (response) {
        messageApi.open({
          type: 'success',
          content: `Welcome back, ${email}`,
        });
        console.log('login ' + response);
        window.location.href = '/'+response.toLowerCase() + '/dashboard';
      }
      else {
        messageApi.open({
          type: 'error',
          content: 'Wrong Email or password',
        });
      }

    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };
  return (
    <div className='container'>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: '#D50B1B',
              colorPrimaryActive: '#D50B1B',
              colorPrimaryHover: '#c70f1f',
            },
            Form: {
              verticalLabelPadding: 0,
            },
            Input: {
              colorPrimaryHover: '#D50B1B',
              colorPrimaryActive: '#D50B1B',
              colorPrimary: '#D50B1B',
            },
          },
        }}
      >
        <Form
          className='mx-auto login-form'
          name="loginForm"
          labelCol={{
            span: 24,
          }}
          style={{
            maxWidth: 488,
          }}
          onFinish={onFinish}
          requiredMark={false}
        >
          <div className='d-flex justify-content-center'>
            <img style={{ width: 55 }} src={LogoIcon} alt="" />
          </div>
          <h3 style={{ textAlign: 'center' }} className='m-3'>
            Login to your account
          </h3>
          <Form.Item
            className='m-3'
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email',
              },
            ]}
          >
            <Input placeholder='example@gmail.com' />
          </Form.Item>
          <Form.Item
            className='m-3'
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password placeholder='············' />
          </Form.Item>
          <Form.Item
            className='m-3'
            wrapperCol={{
              span: 24,
            }}
          >
            <Button style={{ width: '100%' }} className='mt-3' type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default LoginPage;
