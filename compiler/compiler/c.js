const {v4: uuid} = require('uuid');
const {exec} = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const saveFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve([file]);
      }
    });
  });
};

async function deleteFiles(cPath, inputPath, exePath) {
  if (fs.existsSync(cPath)) {
    await fs.unlinkSync(cPath);
  }

  if (fs.existsSync(inputPath)) {
    await fs.unlinkSync(inputPath);
  }

  if (fs.existsSync(exePath)) {
    await fs.unlinkSync(exePath);
  }
}

function getRunCommand(executable, input) {
  return `${executable} < ${input}`;
}

function getExecutablePath(fileName) {
  if (os.platform() === 'win32') {
    return `${path.join(__dirname, '..', 'upload', fileName)}.exe`;
  }
  if (os.platform() === 'linux') {
    return `${path.join(__dirname, '..', 'upload', fileName)}`;
  }
}

function getCPath(fileName) {
  return `${path.join(__dirname, '..', 'upload', fileName)}.c`;
}

function getInputPath(fileName) {
  return `${path.join(__dirname, '..', 'upload', fileName)}-input.txt`;
}

function compileProgram(cPath, exePath) {
  return new Promise((resolve, reject) => {
    exec(`gcc -o ${exePath} ${cPath}`, (error, stdout, stderr) => {
      if (error) {
        reject({error, stdout, stderr});
      } else {
        resolve({stdout, stderr});
      }
    });
  });
}

function runProgram(exePath, inputPath) {
  return new Promise((resolve, reject) => {
    exec(getRunCommand(exePath, inputPath), (error, stdout, stderr) => {
      if (error) {
        reject({error, stdout, stderr});
      } else {
        resolve({stdout, stderr});
      }
    });
  });
}

const CCompile = async (code, input) => {
  let state = {
    stdout: null,
    stderr: null,
    statusMes: '',
  };

  let uniqueFileName = uuid();
  let executePath = getExecutablePath(uniqueFileName);
  let cPath = getCPath(uniqueFileName);
  let ipPath = getInputPath(uniqueFileName);

  await saveFile(cPath, code);
  await saveFile(ipPath, input);

  console.log(cPath, ipPath);
  try {
    await compileProgram(cPath, executePath);
  } catch (err) {
    state.stderr = err.stderr;
    state.statusMes = 'Compiler Error';
    deleteFiles(cPath, ipPath, executePath);
    return state;
  }

  try {
    let {stdout, stderr} = await runProgram(executePath, ipPath);
    state.stdout = stdout;
    state.stderr = stderr;
  } catch (err) {
    state.stderr = err.stderr;
    state.statusMes = 'Run Time Error';
    deleteFiles(cPath, ipPath, executePath);
  }

  if (state.stderr === '') {
    state.stderr = null;
  }
  state.statusMes = 'Successfully Compiled';
  await deleteFiles(cPath, ipPath, executePath);
  return state;
};

module.exports = {CCompile};
