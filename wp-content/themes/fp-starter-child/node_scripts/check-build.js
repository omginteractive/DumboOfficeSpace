const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const executeBuild = () => {
  console.log('building!');
  const command = 'npm run build';

  return new Promise((resolve, reject) => {
    console.log('executing command:', command);
    const childProcess = exec(command, (error, stdout, stderr) => {
      console.log('running exec callback');

      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error);
        return;
      }

      // if (stderr) {
      //   console.error(`Command error output: ${stderr}`);
      //   reject(new Error(stderr));
      //   return;
      // }

      console.log(`Command output: ${stdout}`);
      resolve(stdout);
    });

    childProcess.stdout.on('data', (data) => {
      console.log('Command stdout:', data.toString());
    });

    childProcess.stderr.on('data', (data) => {
      console.error('Command stderr:', data.toString());
    });

    childProcess.on('exit', (code, signal) => {
      console.log('Command exited with code:', code, 'and signal:', signal);
      if (code !== 0) {
        reject(new Error(`Command exited with non-zero code: ${code}`));
      }
    });

    childProcess.on('error', (err) => {
      console.error('Command execution error:', err);
      reject(err);
    });
  });
};


const runBuildIfNeeded = async () => {
  const parentBuildFolder = path.join(__dirname, '../../fp-starter/build');
  const parentNodeFolder = path.join(__dirname, '../../fp-starter/node_modules');
  const childNodeFolder = path.join(__dirname, '../node_modules');

  const foldersExist = fs.existsSync(parentBuildFolder) && fs.existsSync(parentNodeFolder) && fs.existsSync(childNodeFolder);
  
  if (!foldersExist) {
    try {
      await executeBuild();
      console.log('Build succeeded.');
      return true; // Build successful
    } catch (error) {
      console.error('Build failed:', error);
      return false; // Build failed
    }
  }
  
  console.log('Folders exist, skipping build.');
  return true; // Folders exist, no need to build
};

const checkIfBuildAndNodeFoldersExist = () => {
  const parentBuildFolder = path.join(__dirname, '../../fp-starter/build');
  if (fs.existsSync(parentBuildFolder)) console.log("fp-starter/build exists (parent theme)");
  else return false
  const parentNodeFolder = path.join(__dirname, '../../fp-starter/node_modules');
  if (fs.existsSync(parentNodeFolder)) console.log("fp-starter/node_modules exists (parent theme)");
  else return false
  const childNodeFolder = path.join(__dirname, '../node_modules');
  if (fs.existsSync(childNodeFolder)) console.log("fp-starter-child/node_modules exists (child theme)");
  else return false
  return true
}

const main = async () => {
  const buildSuccess = await runBuildIfNeeded();

  if (!buildSuccess) {
    console.log('Build failed. Exiting...');
    process.exit(1);
  }

  console.log('Build finished successfully. Continuing checks...');
  const foldersExist = checkIfBuildAndNodeFoldersExist();

  if (foldersExist) {
    console.log("Build/node check passed");
    process.exit(0);
  } else {
    console.log("Build/node check failed");
    process.exit(1);
  }
}

main();
console.log('execute "npm run watch" from the child theme to compile. This command will also check if the build folders have been created')