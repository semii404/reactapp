import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,Form, Input, notification } from 'antd';
import { api1 } from '../API/axios';
import  {useDispatch} from 'react-redux'
import { logIN } from '../Middleware/Thunk/thunkcalls';
import { openNotification } from '../Helper/OpenNotiy';

function LogIn() {
    const dispatch = useDispatch(); 

    const [api,contextHolder]=notification.useNotification();
    const onFinish =async (values) => {
         await api1.get(`/logindata?q=${values.email}`).then((response)=>{

           
           if(response.data.length === 0){
             openNotification(api,"Email Not Registered","warning")
             return;
            }
            if(response.data[0].password === values.password){
              delete response.data[0].password;
              dispatch(logIN(response.data[0]));
              
            }
            else{
              
              openNotification(api,"Email and Password are Incorrect","warning",3)
            }
          }).catch((err)=>{
              openNotification(api,err.message,"warning",3)
          })
    };
    return (
    <Form
    name="normal_login"
    className="login-form"
    
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        >
          {contextHolder}
        <Form.Item
          name="email"
          rules={[
            {
              type:'email',
              required: true,
              message: 'Please input your Email!',
            },
          ]}
          >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
   
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
       
        </Form.Item>
      </Form>
  )
}

export default LogIn