const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { getCompletionScript } = require('..');

describe('getCompletionScript gets the right completion script for', () => {
  for (const shell of ['bash', 'fish', 'zsh']) {
    it(shell, async () => {
      const received = await getCompletionScript({
        name: 'foo',
        completer: 'foo-complete',
        shell
      });
      const expected = fs.readFileSync(require.resolve(`../lib/scripts/${shell}.sh`), 'utf8')
        .replace(/\{pkgname\}/g, 'foo')
        .replace(/{completer}/g, 'foo-complete')
        .replace(/\r?\n/g, '\n');
      assert.equal(received, expected);
    });
  }
});
