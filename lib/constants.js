const BASH_LOCATION = '~/.bashrc';
const FISH_LOCATION = '~/.config/fish/config.fish';
const ZSH_LOCATION = '~/.zshrc';
const PWSH_LOCATION = '~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1';
const COMPLETION_DIR = '~/.config/tabtab';

const SHELL_LOCATIONS = {
  bash: '~/.bashrc',
  zsh: '~/.zshrc',
  fish: '~/.config/fish/config.fish',
  pwsh: '~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1'
};

const COMPLETION_FILE_EXT = {
  bash: 'bash',
  fish: 'fish',
  pwsh: 'ps1',
  zsh: 'zsh',
};

module.exports = {
  BASH_LOCATION,
  ZSH_LOCATION,
  FISH_LOCATION,
  PWSH_LOCATION,
  COMPLETION_DIR,
  SHELL_LOCATIONS,
  COMPLETION_FILE_EXT,
};
