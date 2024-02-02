const assert = require('assert');
const { SUPPORTED_SHELLS, getShellFromEnv } = require('..');

describe('getShellFromEnv', () => {
  it('errors when env lacks SHELL', () => {
    assert.throws(
      () => getShellFromEnv({}),
      {
        message: 'SHELL cannot be empty',
      },
    )
  });

  it('errors on unsupported shells', () => {
    assert.throws(
      () => getShellFromEnv({ SHELL: 'unknown' }),
      {
        message: "SHELL was set to an invalid value (unknown). Supported values are: 'bash', 'fish', 'pwsh', 'zsh'",
      },
    );
  })

  it('returns supported shells', () => {
    assert.deepStrictEqual(
      SUPPORTED_SHELLS.map(SHELL => getShellFromEnv({ SHELL })),
      SUPPORTED_SHELLS,
    );
  });
});
