import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import styles from './AuthForm.module.css';

const API_KEY='AIzaSyBqTyIEX7dxcB2oTSjoq4qwJIbbFmYieEs'

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
    let url = ''

    if(isLoginAction)
    {
      //Log IN
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`   
    }
    else
    {
      //Sign UP
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`      
    }

    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((res)=>
      {
        if(res.ok)
        {
          return res.json()
        }
        else
        {
          return res.json().then(data =>
            {              
              let errorMessage = 'Coś jest nie tak :C '
              if(data && data.error && data.error.message)
              {
                errorMessage += data.error.message
              }                  
              throw new Error(errorMessage)
            })
        }
      }).then((data) => {
        //console.log(data.idToken) //token, email etc.
        const expirationTime =  new Date(new Date().getTime() + (+data.expiresIn * 1000))
        authCtx.login(data.idToken, expirationTime)
        history.replace('/')
      }).catch(err=>{
        alert(err)
        //setIsError(err)   //failed log in or sign up
      })
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
