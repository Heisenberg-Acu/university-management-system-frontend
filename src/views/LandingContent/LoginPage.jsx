import React from 'react';
import { Form, Input, Button, ConfigProvider, message } from 'antd';
import axios from 'axios';
import LogoIcon from '../../assets/common/logo-icon.png'
import '../../styles/views/LandingContent/LoginPage.css'
const LoginPage = () => {
  const apiUrl = 'https://acu-eng.onrender.com/api/v1/signin';
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    const { email, password } = values;
    console.log('Email:', email);
    console.log('Password:', password);
    axios
      .post(apiUrl, {
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle the response data
        console.log('Response:', response.data.message);
          messageApi.open({
            type: 'success',
            content: 'Welcome back, '+email,
          });
      
      })
      .catch((response) => {
        // Handle errors
        messageApi.open({
          type: 'error',
          content: 'Wrong Email or password',
        });
        console.error('Error:', response.response.data.message);
      });
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
              colorPrimaryHover: '#c70f1f'
            },
            Form: {
              verticalLabelPadding: 0
            },
            Input: {
              colorPrimaryHover:'#D50B1B',
              colorPrimaryActive:'#D50B1B',
              colorPrimary:'#D50B1B',
            },
          }
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
          requiredMark ={false}
        >
          <div className='d-flex justify-content-center'>
          <img style={{width:55}} src={LogoIcon} alt="" />
          </div>
          <h3 style={{textAlign:'center'}} className='m-3'>Login to yout account</h3>
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
            <Button style={{width:'100%'}} className='mt-3' type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default LoginPage;
