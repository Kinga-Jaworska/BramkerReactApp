import styles from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
import AuthContext from '../../context/auth-context';
import { useHistory } from 'react-router-dom';

const API_KEY='AIzaSyBqTyIEX7dxcB2oTSjoq4qwJIbbFmYieEs'

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)

  const submitHandler = (e) =>
  {
    e.preventDefault()
    const enteredNewPass = newPasswordInputRef.current.value

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,{
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPass,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorisation': 'Bearer abc'
      }
    }).then((res)=>{
      history.replace('/')
    })
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="6" ref={newPasswordInputRef} />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
