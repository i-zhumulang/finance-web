import JSEncrypt from "jsencrypt";
import { publicKey } from "./publicKey";

export default class RsaEncrypt {
    JsEncrypt = new JSEncrypt();

    encrypt(text: string): any {
        this.JsEncrypt.setPublicKey(publicKey)
        return this.JsEncrypt.encrypt(text)
    }
}