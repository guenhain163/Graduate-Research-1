import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import AuthContext from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize}) => {
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setCurrentUser({});
    navigate('/');
  };

  const languages = [
    {value: 'c', label: 'C'},
    {value: 'c_cpp', label: 'C++'},
    // { value: "csharp", label: "C#" },
    {value: 'python', label: 'Python'},
    {value: 'java', label: 'Java'},
    // { value: "golang", label: "Golang" },
    // { value: "ruby", label: "Ruby" },
    // { value: "nodejs", label: "NodeJs" },
  ];
  const themes = [
    {value: 'vs-dark', label: 'Dark'},
    {value: 'light', label: 'Light'},
  ];
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <h1>Geeks Code Compiler</h1>
        <Select
          options={languages}
          value={userLang}
          onChange={(e) => setUserLang(e.value)}
          placeholder={userLang}
        />
        <Select
          options={themes}
          value={userTheme}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
        />
        <label>Font Size</label>
        <input
          type='range'
          min='18'
          max='30'
          value={fontSize}
          step='2'
          onChange={(e) => {
            setFontSize(e.target.value);
          }}
        />
      </div>
      <div className='user'>
        <div>{currentUser?.username}</div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
