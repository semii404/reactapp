import { Button, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { api1 } from '../API/axios';

function EditUser() {
  const { id } = useParams();
  const [item, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect( () => {
   api1.get(`http://localhost:3002/posts/${id}`)
  .then((response) => {
    setUser(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
  }, [id]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        api1.put(`http://localhost:3002/posts/${id}`,item)
    .then(() => {
       navigate('/dashboard',{state:{s1:'Post Edited Successfully',s2:'success'}})
    })
    .catch((error) => {
        console.log(error);
    });
    };


  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{display:'grid', justifyContent:'center'}}>
      <h1>Edit Details</h1>
    
      <Form >
        
        <Form.Item label="Title">
        <Input  style={{width:'200px'}} type="text" name="title" value={item.title} onChange={handleInputChange} />
      </Form.Item>
        <Form.Item label="Author">
        <Input style={{width:'200px'}} type="text" name="author" value={item.author} onChange={handleInputChange} />
      </Form.Item>
      <Space wrap>
      <Button type="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
        
        <Link to={'/dashboard'}>
         <Button type="primary"danger >
          Cancel
        </Button>  
        </Link>
        </Space>
      </Form>
      
      
    </div>
  );
}

export default EditUser;
