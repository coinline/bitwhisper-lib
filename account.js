export function account(accountHdPrivateKey) {
    const me = {};

    /**
     * 
     * @param {*} index 
     * @returns address text.
     */
    me.getAddress = function getAddress(index) {
        // Using external address
        const derivationPath = `m/0/${index}`;
        const childHdPrivateKey = accountHdPrivateKey.deriveChild(derivationPath);
        const childPrivateKey = childHdPrivateKey.privateKey;
        const address = childPrivateKey.toAddress();
        const addressText = address.toString();
        return addressText;
    }

    // Get next address will be interesting.

    return me;
}