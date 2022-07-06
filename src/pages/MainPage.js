import { useContext, useState, useEffect } from 'react';
import MainPageList from '../components/StartingPage/MainPageList';
import AuthContext from '../context/auth-context';

const MainPage = (props) => {

  const authCtx = useContext(AuthContext)
  let content = ''
 
  //USER OR ADMIN
  if(authCtx.role === 'u')
  {
    content = <p>{authCtx.role}</p>
  }
  else if(authCtx.role === 'a')
  {
    content = <MainPageList/>
  }

  return (<div>{content}</div>);
};

export default MainPage;
