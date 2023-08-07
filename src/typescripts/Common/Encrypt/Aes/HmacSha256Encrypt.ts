import CryptoJS from 'crypto-js';

interface HmacSha256EncryptType {
    key: string

    encrypt(text: string): any

    decrypt(): any
}

export default class HmacSha256Encrypt implements HmacSha256EncryptType {
    key = "AbCd@2022!";

    encrypt(text: string): any {
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.key);
        hmac.update(text);
        return hmac.finalize().toString();
    }

    decrypt(): any {

    }
}