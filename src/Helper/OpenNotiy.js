import { Alert } from "antd";


 
 export  const openNotification = (api,st1,st2,time) => {
        api.open({
          description:
            <> <Alert
            message={st1}
            type={st2}
            showIcon
         
          />
          </>,
          duration:time,
          
          style: {
            width: 300,
          },
        });
      };



     