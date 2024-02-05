const fs = require('fs');
const { promisify } = require('util');
const untildify = require('./untildify');

const readFile = promisify(fs.readFile);

/**
 * @param {String} file
 * @param {() => String} getHomeDir - Function that returns the home directory, usually `os.homedir`
 */
module.exports = async (file, getHomeDir) => {
  let fileExists;
  try {
    await readFile(untildify(file, getHomeDir));
    fileExists = true;
  } catch (err) {
    fileExists = false;
  }

  return fileExists;
};
