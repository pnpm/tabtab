const enquirer = require('enquirer');
const path = require('path');
const debug = require('./utils/tabtabDebug')('tabtab:prompt');

/**
 * Asks user about SHELL and desired location.
 *
 * It is too difficult to check spawned SHELL, the user has to use chsh before
 * it is reflected in process.env.SHELL
 */
const prompt = async () => {
  const questions = [
    {
      type: 'select',
      name: 'shell',
      message: 'Which Shell do you use ?',
      choices: ['bash', 'zsh', 'fish'],
      default: 'bash'
    }
  ];

  const locations = {
    bash: '~/.bashrc',
    zsh: '~/.zshrc',
    fish: '~/.config/fish/config.fish'
  };

  const finalAnswers = {};

  const { shell } = await enquirer.prompt(questions);
  debug('answers', shell);

  const location = locations[shell];
  debug(`Will install completion to ${location}`);

  Object.assign(finalAnswers, { location, shell });

  const { locationOK } = enquirer.prompt({
    type: 'confirm',
    name: 'locationOK',
    message: `We will install completion to ${location}, is it ok ?`
  });

  if (locationOK) {
    debug('location is ok, return', finalAnswers);
    return finalAnswers;
  }

  // otherwise, ask for specific **absolute** path
  const { userLocation } = enquirer.prompt({
    name: 'userLocation',
    message: 'Which path then ? Must be absolute.',
    type: 'input',
    validate: input => {
      debug('Validating input', input);
      return path.isAbsolute(input);
    }
  });
  console.log(`Very well, we will install using ${userLocation}`);
  Object.assign(finalAnswers, { location: userLocation });

  return finalAnswers;
};

module.exports = prompt;
