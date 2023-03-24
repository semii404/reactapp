import { Button, Divider, Form, Input, notification, Space } from 'antd'
import React, { useRef} from 'react'
import { useDispatch } from 'react-redux';
import {  fetchPosts } from '../Middleware/Thunk/thunkcalls';
import { openNotification } from '../Helper/OpenNotiy';


import './POPUP.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/SDK';


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

function PopUp() {
    //notification code
    const [api, contextHolder] = notification.useNotification();

    //button clicking 
    const [form] = Form.useForm();
    const overlayBT = useRef(null);
    const CloseOverlay = () => {
        if (overlayBT.current) {
          overlayBT.current.click();
        }
      };

    //adding new book
    const dispatch=useDispatch();
    const onFinish =async (values) => {
        await addDoc(collection(db,"posts"),values)
        .then(() => {
            dispatch(fetchPosts()); 
            form.resetFields();
           openNotification(api,"Post Added Successfully","success",3)
            CloseOverlay();
        })
        .catch((error) => {
            console.log(error);
        });
    };
  return (
<>   

<Button  href="#popup1" type='primary' style={{backgroundColor:'green', color:'white'}}>Add New Book</Button>

<div id="popup1" className="overlay">
	<div className="popup">
		<h4 style={{textAlign:'left'}}>Add New Book</h4>
        <div className="close">
        <Button href='#' danger>
         &times;
        </Button>
        </div>
        <Divider/>

    <div className="content">
    
    <Form 
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please Enter Book title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="author"
        label="Author"
        rules={[
          {
            required: true,
            message: 'Please Enter Author Name!',
          },
        
        ]}

      >
        <Input />
      </Form.Item>

    <Form.Item {...tailFormItemLayout}>
     <Space wrap>

      <Button type="primary" htmlType='submit' >
         Add Book
        </Button>

         <Button ref={overlayBT} type="primary"danger  href='#' >
          Cancel
        </Button>  
       {contextHolder}
      
     </Space>
    </Form.Item>
</Form>
            
    </div>
	</div>
</div>
</>
  )
}

export default PopUp