import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {login as authServiceLogin} from '../../services/AuthService';
// import {login} from '../../services/AuthService';
import './Login.css';

export const Login = () => {
  const [studentCode, setStudentCode] = useState('');
  const [password, setPassword] = useState('');
  const [studentCodeError, setStudentCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useAuth();

  const onSubmit = async (e) => {
    // e.preventDefault();

    // Set initial error values to empty
    setStudentCodeError('');
    setPasswordError('');

    // Check if the user has entered both fields correctly
    if ('' === studentCode) {
      setStudentCodeError('Please enter your student code');
      return;
    }

    if (!/^\d{8}$/.test(studentCode)) {
      setStudentCodeError('Please enter a valid student code');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 6) {
      setPasswordError('The password must be 6 characters or longer');
      return;
    }

    try {
      const result = await authServiceLogin(studentCode, password);

      if (result) {
        setCurrentUser(result);
        navigate('/');
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={studentCode}
          type='text'
          placeholder='Student Code'
          onChange={(ev) => setStudentCode(ev.target.value)}
          className='inputBox'
        />
        <label className='errorLabel'>{studentCodeError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          type='password'
          placeholder='Password'
          onChange={(ev) => setPassword(ev.target.value)}
          className='inputBox'
        />
        <label className='errorLabel'>{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type='submit' onClick={onSubmit} value={'Log in'} />
      </div>
    </div>
  );
};
