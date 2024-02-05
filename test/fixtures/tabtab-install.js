const os = require('os');
const tabtab = require('../..');

(async () => {
  await tabtab.install({
    name: 'foo',
    completer: 'foo-complete',
    shell: 'bash',
    getHomeDir: os.homedir,
  });
})();
