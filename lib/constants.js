const BASH_LOCATION = '~/.bashrc';
const FISH_LOCATION = '~/.config/fish/config.fish';
const ZSH_LOCATION = '~/.zshrc';
const PWSH_LOCATION = '~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1';
const COMPLETION_DIR = '~/.config/tabtab';
const TABTAB_SCRIPT_NAME = '__tabtab';

const SHELL_LOCATIONS = {
  bash: '~/.bashrc',
  zsh: '~/.zshrc',
  fish: '~/.config/fish/config.fish',
  pwsh: '~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1'
};

module.exports = {
  BASH_LOCATION,
  ZSH_LOCATION,
  FISH_LOCATION,
  PWSH_LOCATION,
  COMPLETION_DIR,
  TABTAB_SCRIPT_NAME,
  SHELL_LOCATIONS
};
