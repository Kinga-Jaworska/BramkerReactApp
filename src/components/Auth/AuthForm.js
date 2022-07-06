import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import styles from './AuthForm.module.css'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { baseURL, auth } from '../../firebase.config';

const AuthForm = () => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()
  const emailInput = useRef()
  const passwordInput = useRef()
  const [isLoginAction, setIsLoginAction] = useState(true);
  const [isError, setIsError] = useState('')


  const switchAuthModeHandler = () => {
    setIsLoginAction((prevState) => !prevState);
    setIsError('')
  };
  const submitHandler = (e) =>
  {
    e.preventDefault()
    const enteredEmail = emailInput.current.value
    const enteredPass = passwordInput.current.value    

    if(isLoginAction)
    {
      //LOG IN:
      signInWithEmailAndPassword(auth, enteredEmail, enteredPass)
      .then(() => {
        const userID = auth.currentUser.uid
        console.log(auth.currentUser.providerId)
        console.log(baseURL)
        auth.currentUser.getIdTokenResult().then((data)=>
        {  
          const expirationTime = new Date(data.expirationTime)
          authCtx.login(auth.currentUser.accessToken, expirationTime,userID)
          history.replace('/')
        }).catch((err)=>alert(err.message))        
      }).catch(err => alert(err.message))
    }
    else
    {   
      createUserWithEmailAndPassword(auth, enteredEmail, enteredPass)
      .then((res) => {
        alert('Witamy na pokładzie. Wystarczy, że się zalogujesz')
        switchAuthModeHandler()
      })
      .catch((error) => {
        setIsError(alert(error.message))
      });      
    }    
  }  

  return (
    <section className={styles.auth}>
      <h1>{isLoginAction ? 'Login' : 'Sign Up'}</h1>
      {isError && <div className='error'>{isError}</div>}
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInput}/>
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Hasło</label>
          <input type='password' id='password' required ref={passwordInput} minLength="6"/>
        </div>
        <div className={styles.actions}>
          <button>{isLoginAction ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLoginAction ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
