import React, { useEffect} from "react";
import { BrowserRouter,Routes, Route,Outlet, Navigate} from 'react-router-dom'
import LoginP from "./Pages/LoginP";

import Dashboard from "./Pages/Dashboard";
import {  useDispatch, useSelector } from "react-redux";
import { logIN } from "./Middleware/Thunk/thunkcalls";
import EditData from "./Componenets/EditData";
import Error from "./Pages/Error";


const Applayout =()=>{
  return (
  <>
  {/**add header here */}
  <Outlet/>
  </>
  );
}

function App() {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.login);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('auth'));
    if (data) {
      dispatch(logIN(data));
    }
  }, [dispatch]);

  
  return (   
    <>
    <BrowserRouter>
    <Routes>
    {/**Routes where your want to show navbar or header */}
    <Route element={<Applayout/>}>
    <Route path="/" element={
      isLoggedIn ? <Navigate to='/dashboard'/> :<LoginP/>}/>
    <Route path="/edit/:id" element={isLoggedIn? <EditData/>: <Navigate to='/' /> }/>
    <Route path="/addnew" element={ <EditData/>}/>
    <Route
           path="/dashboard"
           element={
             <Dashboard isLoggedIn={isLoggedIn} ></Dashboard>  
          }
       />
    </Route>
    {/**routes where navbar is hidden */}
    <Route path="*" element={<Error/>}/>

  </Routes>
       </BrowserRouter>
       
           </> 
  );
}

export default App;
