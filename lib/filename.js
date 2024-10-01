const { COMPLETION_FILE_EXT } = require('./constants');

/**
 * Get a template file name for the SHELL provided.
 * @param {import('./constants').SupportedShell} shell
 * @returns {typeof COMPLETION_FILE_EXT[import('./constants').SupportedShell]}
 */
const completionFileExt = shell => {
  const ext = COMPLETION_FILE_EXT[shell];
  if (!ext) {
    throw new Error(`Unsupported shell: ${shell}`);
  }
  return ext;
};

/**
 * Get a extension for the completion file of the SHELL (without the leading period).
 * @param {String} name
 * @param {import('./constants').SupportedShell} shell
 * @returns {String}
 */
const completionFileName = (name, shell) => {
  const ext = completionFileExt(shell);
  return `${name}.${ext}`;
};

/**
 * Get a tabtab file name for the SHELL provided.
 * @param {import('./constants').SupportedShell} shell
 * @returns {String}
 */
const tabtabFileName = shell => {
  const ext = completionFileExt(shell);
  return `__tabtab.${ext}`;
};

module.exports = {
  completionFileExt,
  completionFileName,
  tabtabFileName,
};
