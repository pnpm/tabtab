const COMPLETION_DIR = '~/.config/tabtab';

/** @type {Record.<String, String>} */
const SHELL_LOCATIONS = {
  bash: '~/.bashrc',
  zsh: '~/.zshrc',
  fish: '~/.config/fish/config.fish',
  pwsh: '~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1'
};

/** @type {Record.<String, String>} */
const COMPLETION_FILE_EXT = {
  bash: 'bash',
  fish: 'fish',
  pwsh: 'ps1',
  zsh: 'zsh',
};

module.exports = {
  COMPLETION_DIR,
  SHELL_LOCATIONS,
  COMPLETION_FILE_EXT,
};
