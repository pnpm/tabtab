/**
 * Turn a path with leading tilde (`~`) into a real path
 *
 * @example
 * const os = require('os')
 * const userConfig = untildify('~/.config', os.homedir)
 *
 * @param {String} pathWithTilde - Path that may have leading tilde
 * @param {() => String} getHomeDir - Function that returns the home directory, usually `os.homedir`
 * @returns {String}
 */
const untildify = (pathWithTilde, getHomeDir) => pathWithTilde.replace(/^~(?=$|\/|\\)/, getHomeDir());

module.exports = untildify
