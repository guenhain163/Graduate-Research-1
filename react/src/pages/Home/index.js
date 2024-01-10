import Editor from '@monaco-editor/react';
import React, { useState } from 'react';
import spinner from '../../assets/images/spinner.svg';
import Navbar from '../../components/Navbar';
import api from '../../services/Api';
import './Home.css';

export const Home = () => {
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);

  // State variable to set editors default language
  const [userLang, setUserLang] = useState('python');

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState('vs-dark');

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users input
  const [userInput, setUserInput] = useState('');

  // State variable to set users output
  const [userOutput, setUserOutput] = useState('');

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    if (userCode === '') {
      return;
    }

    // Post request to compile endpoint
    api
      .post('/compiler', {
        code: userCode,
        language: userLang,
        input: userInput,
      })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput('');
  }

  return (
    <div className='home'>
      <Navbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className='main'>
        <div className='left-container'>
          <Editor
            options={options}
            height='calc(100vh - 50px)'
            width='100%'
            theme={userTheme}
            language={userLang}
            defaultLanguage='python'
            defaultValue='# Enter your code here'
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className='run-btn' onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className='right-container'>
          <h4>Input:</h4>
          <div className='input-box'>
            <textarea id='code-inp' onChange={(e) => setUserInput(e.target.value)}></textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className='spinner-box'>
              <img src={spinner} alt='Loading...' />
            </div>
          ) : (
            <div className='output-box'>
              <pre>{userOutput}</pre>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className='clear-btn'
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
