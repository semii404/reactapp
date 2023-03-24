import { Button, Form, Input, Space } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { db } from '../config/SDK';


function EditUser() {
  const { id } = useParams();
  const [item, setUser] = useState(null);
  const navigate = useNavigate();

  const { posts } = useSelector(state => state.posts); 

  useEffect( () => {
    Object.keys(posts).find(keys=> {if(posts[keys]["id"]=== id) {
      setUser(posts[keys]);
    }})
  },[]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setUser((prevUser) => ( { ...prevUser, [name]: value }));
  };

    const handleSubmit =async (event) => {
        event.preventDefault();
        await setDoc(doc(db,'posts',item.id),{
          title:item.title,
          author:item.author
        })
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
