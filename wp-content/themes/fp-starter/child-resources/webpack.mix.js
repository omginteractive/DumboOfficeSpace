const relativePathToChild = '../../fp-starter-child/';
const mix = require('laravel-mix');
mix.setResourceRoot(relativePathToChild);
const readline = require('readline');
const { readdir, rm } = require('node:fs');
const path = require('path');
const { compiledSassVars } = require(
  relativePathToChild + 'src/ts/createSassVars.js'
);
const fs = require('fs');
const isProduction = process.env.NODE_ENV === 'production';

const searchDirectory = (
  directory,
  searchString,
  warningMessage = '',
  isFirstMatch = true //use this to display warning message only once for each search
) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error reading file stats:', err);
          return;
        }

        if (stats.isDirectory()) {
          searchDirectory(filePath, searchString, warningMessage, isFirstMatch);
        } else if (stats.isFile()) {
          isFirstMatch = searchFile(
            filePath,
            searchString,
            warningMessage,
            isFirstMatch
          );
        }
      });
    });
  });
};

const searchFile = (filePath, searchString, warningMessage, isFirstMatch) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const lines = data.split('\n');

    lines.forEach((line, lineNumber) => {
      if (line.includes(searchString)) {
        if (isFirstMatch && warningMessage) {
          console.log('\x1b[35m' + warningMessage + '\x1b[0m');
          isFirstMatch = false;
        }

        console.log('\x1b[31m%s\x1b[0m', `'${searchString}' in ${filePath} (line ${lineNumber + 1})`);
        
      }
    });
    return isFirstMatch;
  });
};

const verifyWpEnqueueStyle = () => {
  const directoryPath = relativePathToChild + 'src';
  const searchString = 'wp_enqueue_style('; //wp_enqueue_scripts is the hook we dont want to match
  const warningMessage =
    'wp_enqueue_style was found in the child theme.\nPlease use the fp_enqueue_style function instead to ensure versioning is handled correctly.';
  searchDirectory(directoryPath, searchString, warningMessage);
};
const verifyWpEnqueueScript = () => {
  const directoryPath = relativePathToChild + 'src';
  const searchString = 'wp_enqueue_script('; //wp_enqueue_scripts is the hook we dont want to match
  const warningMessage =
    'wp_enqueue_script was found in the child theme.\nPlease use the fp_enqueue_script function instead to ensure versioning is handled correctly.';
  searchDirectory(directoryPath, searchString, warningMessage);
};
function checkScssForHexValuesInFiles(folderPath) {
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Failed to read directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);
      if (file.isDirectory()) {
        checkScssForHexValuesInFiles(filePath); // Recursively call for subdirectory
      } else if (file.isFile() && path.extname(filePath) === '.scss') {
        checkFileForHexValues(filePath); // Check file for hex values if it's a .scss file
      }
    });
  });
}

function checkFileForHexValues(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lineNumber = 0;

  rl.on('line', (line) => {
    lineNumber++;
    const hexRegex = /#([a-fA-F0-9]{3}){1,2}\b/g;
    const matches = line.match(hexRegex);
    if (matches) {
      matches.forEach((match) => {
        console.log(
          `Hexadecimal value ${match} found in SCSS. ${filePath} at line ${lineNumber}. Please use a variable instead if possible.`
        );
      });
    }
  });
}

const runFpChecks = () => {
  console.log('\n\x1b[35mRunning fp checks...\x1b[0m');
  verifyWpEnqueueStyle();
  verifyWpEnqueueScript();
  checkScssForHexValuesInFiles(relativePathToChild + 'src/scss');
  console.log('\x1b[35mOmg checks finished!\x1b[0m');
};
class AfterCompilePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('AfterCompilePlugin', (stats) => {
      if (!stats.hasErrors() && !stats.hasWarnings()) {
        runFpChecks();
      }
    });
  }
}

// Clean old build folder
const build_dir_exists = fs.existsSync(relativePathToChild + 'build');
if (build_dir_exists) {
  rm(relativePathToChild + 'build', { recursive: true }, (err) => {
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
      path.posix.resolve(__dirname, relativePathToChild + 'node_modules'),
      path.posix.resolve(__dirname, relativePathToChild + 'build'),
      path.posix.resolve(__dirname, relativePathToChild + 'vendor'),
    ],
  },
});

mix
  .setPublicPath(relativePathToChild + 'build')
  .version()
  .disableNotifications();

// Compile typescript files
const tsFiles = getFiles(
  relativePathToChild + 'src/ts',
  relativePathToChild + 'js'
);
if (tsFiles) {
  tsFiles.forEach((file) => {
    const isTs = file.name.includes('.ts');
    const isJs = file.name.includes('.js');
    const buildFolder = file.dest.replace(
      'fp-starter-child/',
      'fp-starter-child/build/'
    );
    if (isTs || isJs) mix.ts(`${file.path}/${file.name}`, buildFolder);
  });
}
mix.combine(
  relativePathToChild + 'build/js',
  relativePathToChild + 'build/js/bundle.js'
);

// Compile & bundle scss files
const scssFiles = getFiles(
  relativePathToChild + 'src/scss',
  relativePathToChild + 'css'
);
if (scssFiles) {
  scssFiles.forEach((file) => {
    const isScss = file.name.includes('.scss');
    const buildFolder = file.dest.replace(
      'fp-starter-child/',
      'fp-starter-child/build/'
    );

    if (isScss)
      mix.sass(`${file.path}/${file.name}`, buildFolder, {
        additionalData: compiledSassVars,
      });
  });
}
mix.combine(
  relativePathToChild + 'build/css',
  relativePathToChild + 'build/css/bundle.css'
);

// Compile ACF Block JS files
const acfJSFiles = getFilesByExtension(
  'ts',
  relativePathToChild + 'src/acf-blocks',
  'acf-blocks'
);
if (acfJSFiles) {
  acfJSFiles.forEach((file) => {
    const isTs = file.name.includes('.ts');
    const isJs = file.name.includes('.js');
    const buildFolder = file.dest.replace(
      'fp-starter-child/',
      'fp-starter-child/build/'
    );
    if (isTs || isJs) {
      mix.ts(
        `${file.path}/${file.name}`,
        relativePathToChild + `build/${file.dest}`
      );
    }
  });
}

// Compile ACF Block SCSS files
const acfSCSSFiles = getFilesByExtension(
  'scss',
  relativePathToChild + 'src/acf-blocks',
  'acf-blocks'
);
if (acfSCSSFiles) {
  acfSCSSFiles.forEach((file) => {
    mix.sass(
      `${file.path}/${file.name}`,
      relativePathToChild + `build/${file.dest}`,
      {
        additionalData: compiledSassVars,
      }
    );
  });
}

// Compile core block customizations
mix
  .ts(
    relativePathToChild + 'src/custom-block-panels/index.ts',
    relativePathToChild + 'build/custom-block-panels/bundle.js'
  )
  .react()
  .sass(
    relativePathToChild + 'src/custom-block-panels/index.scss',
    relativePathToChild + 'build/custom-block-panels/bundle.css',
    {
      additionalData: compiledSassVars,
    }
  );

mix.then(() => {
  createPhpFunctionsJson();
});

function createPhpFunctionsJson() {
  const jsonFilename = 'existing-php-functions.json';
  const targetDir = path.join(__dirname, relativePathToChild + 'build/fpstc');
  try {
    fs.mkdirSync(targetDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(`Error creating directory: ${err}`);
    }
  }

  const functionsDir = path.join(
    __dirname,
    relativePathToChild + 'src/functions'
  );
  const jsonData = []; // JSON data object to store PHP file contents
  readPhpFilesRecursively(functionsDir, jsonData);

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

function readPhpFilesRecursively(dir, jsonData) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const isPhpFile = file.endsWith('.php');
    if (stat.isDirectory()) {
      readPhpFilesRecursively(filePath, jsonData); // Recurse into subdirectories
    } else if (isPhpFile) {
      const relativePath = path.relative(
        path.join(__dirname, relativePathToChild + 'src/functions'),
        filePath
      );
      // Add file content to JSON object
      jsonData.push(relativePath);
    }
  });
}

const folderToWatch = relativePathToChild + 'src/functions';

if (!isProduction)
  fs.watch(folderToWatch, { recursive: true }, (eventType, filename) => {
    if (filename.endsWith('.php')) {
      console.log(`PHP file ${filename} event: ${eventType}`);
      createPhpFunctionsJson();
    }
    runFpChecks();
  });
else createPhpFunctionsJson();

mix.webpackConfig({
  plugins: [new AfterCompilePlugin()],
});
