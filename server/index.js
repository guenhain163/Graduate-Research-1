const express = require('express');
const cors = require('cors');
const Axios = require('axios');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/compile', (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  let data = {
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
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
