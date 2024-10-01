const { completionFileExt } = require('../filename');
const data = require('./data.json');

/**
 *
 * @param {import('../constants').SupportedShell} shell
 * @returns {String}
 */
const getTemplate = shell => data[completionFileExt(shell)];

module.exports = {
  getTemplate,
};
