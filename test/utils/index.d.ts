/**
 * Returns both { exists, content }
 *
 * @param {String} filename - The file to check and read
 */
export function readIfExists(filename: string): Promise<{
    exists: boolean;
    content: string;
}>;
export function rejects(promise: any, error: any, message?: string): Promise<void>;
export function afterWrites(prevBashrc: any, prevScript: any): () => Promise<void>;
/** This simply setup a suite with after hook for tabtab.install.
 *
 * Defaults to afterEach, pass in true to make it so that it uses "after"
 * instead.
 *
 * @param {Boolean} shouldUseAfter - True to use after instead of afterEach
 */
export function setupSuiteForInstall(shouldUseAfter?: boolean): Promise<void>;
