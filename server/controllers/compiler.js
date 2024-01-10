const DB = require('../database');
const Axios = require('axios');

const execute = async (req, res) => {
  //getting the required data from the request
  const code = req.body.code;
  const language = req.body.language;
  const input = req.body.input;

  const data = {
    langEnum: [
      'php',
      'python',
      'c',
      'c_cpp',
      'csharp',
      'kotlin',
      'golang',
      'r',
      'java',
      'typescript',
      'nodejs',
      'ruby',
      'perl',
      'swift',
      'fortran',
      'bash',
    ],
    code: code,
    input: input,
    lang: language,
  };

  const options = {
    method: 'POST',
    url: 'https://code-compiler10.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'x-compile': 'rapidapi',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '69013fb41amshfc8ac3529deff05p16ea8ajsnbb217edc6a78',
      'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com',
    },
    data: data,
  };
  //calling the code compilation API
  Axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  execute,
};
