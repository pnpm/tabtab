const { TEMPLATE_FILE_NAME, COMPLETION_FILE_EXT, TABTAB_FILE_NAME } = require('./constants');

/**
 * Get a template file name for the SHELL provided.
 * @param {String} shell
 * @returns {String}
 */
const templateFileName = (shell = systemShell()) => {
  const filename = TEMPLATE_FILE_NAME[shell];
  if (!filename) {
    throw new Error(`Unsupported shell: ${shell}`);
  }
  return filename;
};

/**
 * Get a extension for the completion file of the SHELL (without the leading period).
 * @param {String} name
 * @param {String} shell
 * @returns {String}
 */
const completionFileName = (name, shell = systemShell()) => {
  const ext = COMPLETION_FILE_EXT[shell];
  if (!ext) {
    throw new Error(`Unsupported shell: ${shell}`);
  }
  return `${name}.${ext}`;
};

/**
 * Get a tabtab file name for the SHELL provided.
 * @param {String} shell
 * @returns {String}
 */
const tabtabFileName = (shell = systemShell()) => {
  const filename = TABTAB_FILE_NAME[shell];
  if (!filename) {
    throw new Error(`Unsupported shell: ${shell}`);
  }
  return filename;
};

module.exports = {
  templateFileName,
  completionFileName,
  tabtabFileName,
};
