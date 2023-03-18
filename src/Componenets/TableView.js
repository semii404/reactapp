import { Button, Divider, notification, Popconfirm, Popover, Space, Table, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { api1 } from '../API/axios';
import { openNotification } from '../Helper/OpenNotiy';
import { fetchPosts } from '../Middleware/Thunk/thunkcalls';
import { loginSlice } from '../Store/Slices/sampleSlice';
import PopUp from './PopUp';

const { Text } = Typography;


const TableView = () => {
  
    const [api,contextHolder] = notification.useNotification();
    const {state} = useLocation();
    const dispatch=useDispatch();
    
    const logout = ()=>{
      dispatch(loginSlice.actions.logOut());
    }
   useEffect(() => {
        dispatch(fetchPosts());
     
        if(state != null){
          openNotification(api, state.s1, state.s2,3);
        }
      },[dispatch,state,api]);
  
  const { posts } = useSelector(state => state.posts);    
  const removeItem=(id)=>{
        api1.delete(`http://localhost:3002/posts/${id}`)
        .then(() => {
           dispatch(fetchPosts());
           openNotification(api,"Data Deleted Successfully","success",3)
      
      })
      .catch((error) => {
        console.log(error);
    });
    }
    //table format of column
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key:'title',
        render: (text) =><>{text}</> ,
      },
      {
        title: 'Author',
        dataIndex: 'author',
        
      },
      {
        title: 'Action',
        dataIndex: 'id',
        data:{posts},
        render:(id,data)=> <>
            <Space wrap>
              
        <Popover placement="left" title={()=> <>{data.title}</>} content={<div>{data.author}<Divider/> {<>more data here we can add according to need this is not editable cause it is written in html tag</>}</div>} trigger="click">

        <Button type='primary' >View</Button>
        </Popover>
               
        <Link to={`/edit/${id}`}>
          <Button type="dashed" danger>
          Edit 
          </Button>
          </Link>

  <Popconfirm

    title="Delete the task"
    description="Are you sure to delete this task?"
    okText={<div onClick={() => removeItem(id)}>Yes</div>}
    cancelText="No"
  >
   
     <Button  type="primary" danger>
          Delete
      </Button>
  </Popconfirm>
        </Space>
        </>
      },
    ];
    
return(

<div style={{margin:'50px'}}>
    <div style={{display:'flex', justifyContent:'end'}}>
      <Button type="primary" onClick={logout} danger>
            Log Out
     </Button>
      </div>
    <Divider />
  
    <Text style={{display:'flex', textAlign:'center', flexDirection:'column'}} type="success">Available data
    <Divider/>
    <PopUp/>
    </Text>
    
    <br></br>
<Table columns={columns} dataSource={posts} />
{contextHolder}
</div>

)
}
export default TableView;