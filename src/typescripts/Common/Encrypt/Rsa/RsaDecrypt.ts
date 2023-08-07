import JSEncrypt from "jsencrypt";
import { privateKey } from "./privateKey";

export default class RsaDecrypt {
    JsEncrypt = new JSEncrypt();

    decrypt(text: string): any {
        this.JsEncrypt.setPrivateKey(privateKey);
        return this.JsEncrypt.decrypt(text);
    }
}