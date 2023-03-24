import { notification, Typography } from 'antd';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

import TableView from '../Componenets/TableView'
import { db } from '../config/SDK';
import { loginSlice } from '../Store/Slices/sampleSlice';


const {Text }= Typography;

function Dashboard({isLoggedIn}) {
  
  const { DOB,dobC,id } = useSelector(state => state.login);
  const [api,contextHolder] = notification.useNotification();
  const dispatch=useDispatch();

  //setting for next year login
  const onClose =async () => {
    await updateDoc(doc(db,"users",id),{dobC:true})
    .then(
      dispatch(loginSlice.actions.closedob())
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

  const ctoF=async ()=>{
    dispatch(loginSlice.actions.nextyear())
    await updateDoc(doc(db,"users",id),{dobC:false}).then(
    ).catch((err)=>{
      console.log(err)
    })
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