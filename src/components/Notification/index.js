import React, { useMemo } from 'react';
import {  notification } from 'antd';

const Context = React.createContext({
    name: 'Default',
  });

export const openNotificationSuccess = (placement , mess, content) => {
  
    notification.success({
      message: `${mess}`,
      description: <Context.Consumer>{({ name }) => `${content}`}</Context.Consumer>,
      placement,
    });
  }
export  const openNotificationErorr = (placement , mess, content) => {
    
    notification.error({
      message: `${mess}`,
      description: <Context.Consumer>{({ name }) => `${content}`}</Context.Consumer>,
      placement,
    });
  }


