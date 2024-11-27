import { Certificate } from "pkijs";

export interface CertBundle {
    certificate: Certificate;
    privateKey: CryptoKey;
    privateKeyEcdh: CryptoKey;
}