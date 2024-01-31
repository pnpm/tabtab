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

const TEMPLATE_FILE_NAME = {
  bash: 'bash.sh',
  fish: 'fish.sh',
  pwsh: 'pwsh.ps1',
  zsh: 'zsh.sh',
};

const COMPLETION_FILE_EXT = {
  bash: 'bash',
  fish: 'fish',
  pwsh: 'ps1',
  zsh: 'zsh',
};

const TABTAB_FILE_NAME = {
  bash: '__tabtab.bash',
  fish: '__tabtab.fish',
  pwsh: '__tabtab.ps1',
  zsh: '__tabtab.zsh',
};

module.exports = {
  BASH_LOCATION,
  ZSH_LOCATION,
  FISH_LOCATION,
  PWSH_LOCATION,
  COMPLETION_DIR,
  SHELL_LOCATIONS,
  TEMPLATE_FILE_NAME,
  COMPLETION_FILE_EXT,
  TABTAB_FILE_NAME,
};
