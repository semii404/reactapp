import { Tabs } from 'antd';
import LGCMP from '../Componenets/LogIn';
import SUCMP from '../Componenets/SignUp';
import './Login.css'

const cards = [
  { title: 'LogIn', content: <LGCMP/> },
  { title: 'SignUp', content: <SUCMP/> }
];

const LoginSignUP = () => {
  
  return (
    
        <div className="container">
        <div className="body d-md-flex align-items-center justify-content-between">
            <div className=" mt-md-0 mt-5">
            <Tabs
    centered
   
    type="card"
    items={cards.map((key) => {
      return {
        label: `${key.title}`,
        key:key.title,
        children: <div className='container box-1'>{key.content} </div>,
      };
    })}
  />
          </div>
        </div>
    </div>
      )}
        
export default LoginSignUP;
