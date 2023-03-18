import { notification, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { api1 } from '../API/axios';
import TableView from '../Componenets/TableView'
import { logIN } from '../Middleware/Thunk/thunkcalls';
import { loginSlice } from '../Store/Slices/sampleSlice';


const {Text }= Typography;

function Dashboard({isLoggedIn}) {
  
  const { DOB,dobC,id } = useSelector(state => state.login);
  const [api,contextHolder] = notification.useNotification();
  const dispatch=useDispatch();

  //stting for next year login
  const onClose = () => {
   dispatch(loginSlice.actions.closedob())
   api1.patch(`/logindata/${id}`, {dobC:true})
   .then((res)=>{
    dispatch(logIN(res.data))
   }
   )
   .catch((err)=>{
    console.log(err);
   })
  };


  //Birthday notification for permanet
  const Bnotifi = () => {
    api.open({
      message: <><Text type='success'>Happy Birthday to you</Text> </>,
      description:
        '“Count your life by smiles, not tears. Count your age by friends, not years. Happy birthday!”',
      style: {
        width: 600,
      },
      duration:0,
      onClose:onClose
  });
  };

  const ctoF=()=>{
    dispatch(loginSlice.actions.nextyear())
     api1.patch(`/logindata/${id}`,{dobC:false})
  }
 

  useEffect(() => {
    
    if (DOB) {
      const Bdate = parseInt(DOB.substring(8,10));
      const Bmonth = parseInt(DOB.substring(5,7));
      const today=new Date();
      const Tdate=today.getDate();
      const Tmonth = today.getMonth()+1;
      if(Bdate === Tdate && Bmonth === Tmonth && !dobC){
        Bnotifi();
      }else if(Bdate !== Tdate && dobC){
        ctoF();
      }
    }

  });
  
  
  
  if (!isLoggedIn) {
        return <Navigate to="/" replace />
      }
      
  return  (
    <>
    <TableView/>
    {contextHolder}
    </>
  )
}

export default Dashboard