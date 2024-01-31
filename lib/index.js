const { SHELL_LOCATIONS } = require('./constants');
const prompt = require('./prompt');
const installer = require('./installer');
const { tabtabDebug, systemShell } = require('./utils');

// If TABTAB_DEBUG env is set, make it so that debug statements are also log to
// TABTAB_DEBUG file provided.
const debug = tabtabDebug('tabtab');

/**
 * Construct a completion script.
 * @param {Object} options - Options object.
 * @param {String} options.name - The package configured for completion
 * @param {String} options.completer - The program the will act as the completer for the `name` program
 * @param {String} options.shell
 * @returns {Promise.<String>}
 */
const getCompletionScript = async ({ name, completer, shell }) => {
  if (!name) throw new TypeError('options.name is required');
  if (!completer) throw new TypeError('options.completer is required');
  if (!shell) throw new TypeError('options.shell is required');
  const completionScriptContent = await installer.getCompletionScript({ name, completer, shell });
  return completionScriptContent
}

/**
 * Install and enable completion on user system. It'll ask for:
 *
 * - SHELL (bash, zsh or fish)
 * - Path to shell script (with sensible defaults)
 *
 * @param {Object} options to use with namely `name` and `completer`
 * @param {String} options.name
 * @param {String} options.completer
 * @param {String} options.shell
 */
const install = async (options) => {
  const { name, completer } = options;
  if (!name) throw new TypeError('options.name is required');
  if (!completer) throw new TypeError('options.completer is required');

  if (options.shell) {
    const location = SHELL_LOCATIONS[options.shell];
    if (!location) {
      throw new Error(`Couldn't find shell location for ${options.shell}`);
    }
    await installer.install({
      name,
      completer,
      location,
      shell: options.shell
    });
    return;
  }
  const { location, shell } = await prompt();

  await installer.install({
    name,
    completer,
    location,
    shell
  });
};

const uninstall = async (options = { name: '' }) => {
  const { name } = options;
  if (!name) throw new TypeError('options.name is required');

  try {
    await installer.uninstall({ name });
  } catch (err) {
    console.error('ERROR while uninstalling', err);
  }
};

/**
 * Public: Main utility to extract information from command line arguments and
 * Environment variables, namely COMP args in "plumbing" mode.
 *
 * options -  The options hash as parsed by minimist, plus an env property
 *            representing user environment (default: { env: process.env })
 *    :_      - The arguments Array parsed by minimist (positional arguments)
 *    :env    - The environment Object that holds COMP args (default: process.env)
 *
 * Examples
 *
 *   const env = tabtab.parseEnv();
 *   // env:
 *   // complete    A Boolean indicating whether we act in "plumbing mode" or not
 *   // words       The Number of words in the completed line
 *   // point       A Number indicating cursor position
 *   // line        The String input line
 *   // partial     The String part of line preceding cursor position
 *   // last        The last String word of the line
 *   // lastPartial The last word String of partial
 *   // prev        The String word preceding last
 *
 * Returns the data env object.
 */
const parseEnv = env => {
  if (!env) {
    throw new Error('parseEnv: You must pass in an environment object.');
  }

  debug(
    'Parsing env. CWORD: %s, COMP_POINT: %s, COMP_LINE: %s',
    env.COMP_CWORD,
    env.COMP_POINT,
    env.COMP_LINE
  );

  let cword = Number(env.COMP_CWORD);
  let point = Number(env.COMP_POINT);
  const line = env.COMP_LINE || '';

  if (Number.isNaN(cword)) cword = 0;
  if (Number.isNaN(point)) point = 0;

  const partial = line.slice(0, point);

  const parts = line.split(' ');
  const prev = parts.slice(0, -1).slice(-1)[0];

  const last = parts.slice(-1).join('');
  const lastPartial = partial
    .split(' ')
    .slice(-1)
    .join('');

  let complete = true;
  if (!env.COMP_CWORD || !env.COMP_POINT || !env.COMP_LINE) {
    complete = false;
  }

  return {
    complete,
    words: cword,
    point,
    line,
    partial,
    last,
    lastPartial,
    prev
  };
};

/**
 * @typedef {Object} CompletionItem
 * @property {String} name
 * @property {String} [description]
 */

/**
 * Helper to normalize String and Objects with { name, description } when logging out.
 *
 * @param {String|CompletionItem} item - Item to normalize
 * @param {String} shell
 * @returns {CompletionItem} normalized items
 */
const completionItem = (item, shell) => {
  debug('completion item', item);

  if (typeof item === 'object') return item

  let name = item;
  let description = '';
  const matching = /^(.*?)(\\)?:(.*)$/.exec(item);
  if (matching) {
    [, name, , description] = matching;
  }

  if (shell === 'zsh' && /\\/.test(item)) {
    name += '\\';
  }

  return {
    name,
    description
  };
};

/**
 * Main logging utility to pass completion items.
 *
 * This is simply an helper to log to stdout with each item separated by a new
 * line.
 *
 * Bash needs in addition to filter out the args for the completion to work
 * (zsh, fish don't need this).
 *
 * @param {Array.<CompletionItem | String>} args to log, Strings or Objects with name and
 * description property.
 * @param {String} shell
 */
const log = (args, shell = systemShell()) => {
  if (!Array.isArray(args)) {
    throw new Error('log: Invalid arguments, must be an array');
  }

  // Normalize arguments if there are some Objects { name, description } in them.
  let lines = args.map(item => completionItem(item, shell)).map(item => {
    const { name: rawName, description: rawDescription } = item;

    const name = shell === 'zsh' ? rawName?.replace(/:/g, '\\:') : rawName;
    const description =
      shell === 'zsh' ? rawDescription?.replace(/:/g, '\\:') : rawDescription;
    let str = name;

    if (shell === 'zsh' && description) {
      str = `${name}:${description}`;
    } else if ((shell === 'fish' || shell === 'pwsh') && description) {
      str = `${name}\t${description}`;
    }

    return str;
  });

  if (shell === 'bash') {
    const env = parseEnv(process.env);
    lines = lines.filter(arg => arg.indexOf(env.last) === 0);
  }

  for (const line of lines) {
    console.log(`${line}`);
  }
};

/**
 * Logging utility to trigger the filesystem autocomplete.
 *
 * This function just returns a constant string that is then interpreted by the
 * completion scripts as an instruction to trigger the built-in filesystem
 * completion.
 */
const logFiles = () => {
  console.log('__tabtab_complete_files__');
};

module.exports = {
  shell: systemShell,
  getCompletionScript,
  install,
  uninstall,
  parseEnv,
  log,
  logFiles
};
