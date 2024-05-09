
let credentials = {
    mnemonicPhrase: '',
    password: ''
}

export function foo() {
    return 'bar 1';
}

/**
 * Throws an error if initialization fails.
 * @param {string} mnemonicPhrase 
 * @param {string} password 
 */
export function init(mnemonicPhrase, password) {
    credentials.mnemonicPhrase = '';
    credentials.password = '';

    if (!Mnemonic.isValid(mnemonicPhrase)) {
        throw new Error('Invalid mnemonic phrase.');
    }

    if (password.length == 0) {
        throw new Error('Blank password.');
    }


    // Let's derive the first address.
    const code = new Mnemonic(mnemonicPhrase);
    const rootHdPrivateKey = code.toHDPrivateKey(password);

    credentials.mnemonicPhrase = mnemonicPhrase;
    credentials.password = password;

    console.log(`rootHdPrivateKey: ${rootHdPrivateKey}`, rootHdPrivateKey);

    const accountPath = "m/44'/0'/0'";
    const accountHdPrivateKey = rootHdPrivateKey.derive(accountPath);
    console.log(`accountHdPrivateKey: ${accountHdPrivateKey}`, accountHdPrivateKey);

    const firstExternalPrivateHdKey = accountHdPrivateKey.derive("m/0/0");
    const firstExternalPrivateKey = firstExternalPrivateHdKey.privateKey;

    console.log(`firstExternalPrivateKey: ${firstExternalPrivateKey}`, firstExternalPrivateKey);
    const address = firstExternalPrivateKey.toAddress();
    console.log(`address: ${address}`, address);
}

