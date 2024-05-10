import { account } from './account.js';

const BIP44_COIN_TYPE_BSV = 236;

const FUNDING_ACCOUNT_INDEX = 0;
const PROFILE_ACCOUNT_INDEX = 1;

let credentials = {
    mnemonicPhrase: '',
    password: ''
}

let fundingAccount = null;
let profileAccount = null;

export function foo() {
    return 'bar 1';
}


function createAccount(rootHdPrivateKey, accountIndex) {
    const path = `m/44'/${BIP44_COIN_TYPE_BSV}'/${accountIndex}'`;
    const hdPrivateKey = rootHdPrivateKey.deriveChild(path);
    return account(hdPrivateKey);
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
    const accountHdPrivateKey = rootHdPrivateKey.deriveChild(accountPath);
    console.log(`accountHdPrivateKey: ${accountHdPrivateKey}`, accountHdPrivateKey);

    const firstExternalPrivateHdKey = accountHdPrivateKey.deriveChild("m/0/0");
    const firstExternalPrivateKey = firstExternalPrivateHdKey.privateKey;

    console.log(`firstExternalPrivateKey: ${firstExternalPrivateKey}`, firstExternalPrivateKey);
    const address = firstExternalPrivateKey.toAddress();
    console.log(`address: ${address}`, address);

    fundingAccount = createAccount(rootHdPrivateKey, FUNDING_ACCOUNT_INDEX);
    const fundingAddress0 = fundingAccount.getAddress(0);
    console.log(`fundingAddress0: ${fundingAddress0}`);

    profileAccount = createAccount(rootHdPrivateKey, PROFILE_ACCOUNT_INDEX);
    const profileAddress0 = profileAccount.getAddress(0)
    console.log(`profileAccount0: ${profileAddress0}`);

}

