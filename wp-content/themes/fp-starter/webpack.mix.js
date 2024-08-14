const mix = require('laravel-mix');
const { readdir, rm } = require('node:fs');
const path = require('path');
const { compiledSassVars } = require('./src/ts/createSassVars.js');
const fs = require('fs');
const isProduction = process.env.NODE_ENV === 'production';

// Clean old build folder
const build_dir_exists = fs.existsSync('build');
if (build_dir_exists) {
  rm('build', { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
// Helper Functions
const getFiles = (dir, dest = '') => {
  let files = [];
  try {
    readdir(dir, { recursive: true, withFileTypes: true }, (err, data) => {
      if (err) throw err;
      data.forEach((file) => {
        if (file.isFile()) {
          files.push({
            path: file.path,
            name: file.name,
            dest: dest ? dest : file.path.replace(/^src[\/|\\]/, ''),
          });
        }
      });
    });
    return files;
  } catch (err) {
    console.error(err);
  }
};
const getFilesByExtension = (extension, dir, dest = '') => {
  let files = [];
  try {
    readdir(dir, { recursive: true, withFileTypes: true }, (err, data) => {
      if (err) throw err;
      data.forEach((file) => {
        if (file.isFile() && file.name.endsWith(extension)) {
          files.push({
            name: file.name,
            path: file.path,
            dest: dest ? dest : file.path,
          });
        }
      });
    });
    return files;
  } catch (err) {
    console.error(err);
  }
};

// Set Watch Options
mix.webpackConfig({
  watchOptions: {
    ignored: [
      path.posix.resolve(__dirname, './node_modules'),
      path.posix.resolve(__dirname, './build'),
      path.posix.resolve(__dirname, './vendor'),
    ],
  },
});

mix.setPublicPath('build').version().disableNotifications();

// Compile typescript files
const tsFiles = getFiles('src/ts', 'js');
if (tsFiles) {
  tsFiles.forEach((file) => {
    const isTs = file.name.includes('.ts');
    const isJs = file.name.includes('.js');
    if (isTs || isJs) mix.ts(`${file.path}/${file.name}`, `build/${file.dest}`);
  });
}
mix.combine('build/js', 'build/js/bundle.js');

// Compile & bundle scss files
const scssFiles = getFiles('src/scss', 'css');
if (scssFiles) {
  scssFiles.forEach((file) => {
    const isScss = file.name.includes('.scss');
    if (isScss)
      mix.sass(`${file.path}/${file.name}`, `build/${file.dest}`, {
        additionalData: compiledSassVars,
      });
  });
}
mix.combine('build/css', 'build/css/bundle.css');

// Compile ACF Block JS files
const acfJSFiles = getFilesByExtension('ts', 'src/acf-blocks', 'acf-blocks');
if (acfJSFiles) {
  acfJSFiles.forEach((file) => {
    const isTs = file.name.includes('.ts');
    const isJs = file.name.includes('.js');
    if (isTs || isJs) mix.ts(`${file.path}/${file.name}`, `build/${file.dest}`);
  });
}

// Compile ACF Block SCSS files
const acfSCSSFiles = getFilesByExtension(
  'scss',
  'src/acf-blocks',
  'acf-blocks'
);
if (acfSCSSFiles) {
  acfSCSSFiles.forEach((file) => {
    mix.sass(`${file.path}/${file.name}`, `build/${file.dest}`, {
      additionalData: compiledSassVars,
    });
  });
}
const phpExtension = '.php';
const phpJsonFilename = 'existing-php-functions.json';
const fpstBuildDir = path.join(__dirname, 'build/fpst');
const functionsRelativeDir = 'src/functions';
const fpstFunctionsDir = path.join(__dirname, functionsRelativeDir);
const createPhpFunctionsJson = () => {
  createJsonFileList(
    phpExtension,
    phpJsonFilename,
    fpstBuildDir,
    fpstFunctionsDir
  );
};
mix.then(() => {
  createPhpFunctionsJson();
});

/*
 * Create a JSON file listing all files in a directory.
 * The JSON file will be saved in the target directory.
 * This is necessary because GH Actions will not remove files that are no longer in the directory.
 * If we were to ask the server to enqueue PHP files in a folder on the server, there might be files that exist in that folder which we have deleted from the repo.
 * This would cause the server to try to enqueue files that we no longer want to enqueue.
 * By creating a JSON file with a list of all files in the directory, we can check only enqueue files that are in the JSON which will match the files on our local, but not necessarily on the server.
 *
 * @param {string} fileExtension - The file extension to search for
 * @param {string} jsonFilename - The name of the JSON file to create
 * @param {string} targetDir - The directory to save the JSON file
 * @param {string} functionsDir - The directory to search for files
 * @return {void}
 */
function createJsonFileList(
  fileExtension,
  jsonFilename,
  targetDir,
  functionsDir
) {
  try {
    fs.mkdirSync(targetDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(`Error creating directory: ${err}`);
    }
  }

  const jsonData = []; // JSON data object to store PHP file contents
  readFilesRecursivelyByExtension(functionsDir, jsonData, fileExtension);

  try {
    fs.writeFileSync(
      path.join(targetDir, jsonFilename),
      JSON.stringify(jsonData, null, 2)
    );
  } catch (err) {
    console.error(`Error creating JSON file: ${err}`);
    process.exit(1); // Exit the process if file creation fails
  }
}

function readFilesRecursivelyByExtension(dir, jsonData, extension) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const fileHasExtension = file.endsWith(extension);
    if (stat.isDirectory()) {
      readFilesRecursivelyByExtension(filePath, jsonData, extension); // Recurse into subdirectories
    } else if (fileHasExtension) {
      const relativePath = path.relative(fpstFunctionsDir, filePath);
      jsonData.push(relativePath);
    }
  });
}

// Watch the folder for changes for php
if (!isProduction)
  fs.watch(functionsRelativeDir, { recursive: true }, (eventType, filename) => {
    if (filename.endsWith(phpExtension)) {
      console.log(`PHP file ${filename} has been ${eventType}`);
      createPhpFunctionsJson();
    }
  });
else createPhpFunctionsJson();
