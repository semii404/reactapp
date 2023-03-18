import React from 'react'
import { Button,Form,Input, notification,} from 'antd';
import { api1 } from '../API/axios';
import { openNotification } from '../Helper/OpenNotiy';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 10,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function SignUp() {
    
  const [api,contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
    const onFinish = (values) => {
        delete values.confirm
           api1.get(`/logindata?email=${values.email}`)
           .then((data)=>{
            if(data.data.length !== 0){ openNotification(api,"User Already registered", "warning")}
            else{
              values['dobC']=false;
            api1.post('/logindata',values).then(()=>{
             openNotification(api,"Registerd Successfully","success")
             form.resetFields();
           }
           )
           .catch((err)=>{
             openNotification(api,"Somthing Went wrong", "warning")
           })
            }
            
           })
    };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min:8,
            message: 'Password must be at least 8 characters long!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="fullname"
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input your Name',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
      name="DOB"
      format="YYYY-MM-DD"
      label="Date Of Birth"
      >
        <input type='date'/>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
   
      {contextHolder}
    </Form>

  )
};

export default SignUp