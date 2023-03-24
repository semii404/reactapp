import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,Form, Input, notification } from 'antd';
import  {useDispatch} from 'react-redux'
import { logIN } from '../Middleware/Thunk/thunkcalls';
import { openNotification } from '../Helper/OpenNotiy';
//firebase config
import { collection, getDocs, query, where } from "firebase/firestore"; 
import {db} from "../config/SDK"

function LogIn() {
    const dispatch = useDispatch(); 

    const [api,contextHolder]=notification.useNotification();
    const onFinish =async (values) => {
      const lq= await getDocs(query(collection(db, "users"), where("email", "==", values.email)))
      if(lq.docs.length){
        if(lq.docs[0].data().password === values.password){
          delete lq.docs[0].data().password;
          const data = Object.assign(lq.docs[0].data(), {id:lq.docs[0].id});
          dispatch(logIN(data));
        }else{
          openNotification(api,"Email and password are incorrect", "warning");
          return
        }
       }else{
        openNotification(api,"Email Not Registered", "warning");
       }
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