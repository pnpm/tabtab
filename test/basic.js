const assert = require('assert');
const tabtab = require('..');

describe('tabtab', () => {
  it('tabtab.shell()', () => {
    const previousShell = process.env.SHELL;
    process.env.SHELL = '/bin/bash';
    let shell = tabtab.shell();
    assert.equal(shell, 'bash');

    process.env.SHELL = '/usr/bin/zsh';
    shell = tabtab.shell();
    assert.equal(shell, 'zsh');

    process.env.SHELL = '/usr/bin/fish';
    shell = tabtab.shell();
    assert.equal(shell, 'fish');

    process.env.SHELL = previousShell;
  });
});
