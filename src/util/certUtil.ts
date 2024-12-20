import { BitString, BmpString, fromBER, OctetString, PrintableString } from "asn1js";
import { Attribute, AttributeTypeAndValue, AuthenticatedSafe, CertBag, Certificate, CertificationRequest, getRandomValues, PFX, PKCS8ShroudedKeyBag, PrivateKeyInfo, SafeBag, SafeContents } from "pkijs";
import { Convert } from "pvtsutils";
import { stringToArrayBuffer } from 'pvutils';
import { CertificateBundle } from "./certificateBundle";
import JSZip from "jszip";
import * as fileSaver from 'file-saver';
import { UserControllerApi } from "../backend-api/identity-registry/apis/user-controller-api";

export const issueNewWithLocalKeys = async (
    certificateService: UserControllerApi,
    mrn: string,
    orgMrn: string,
    generatePkcs12: boolean,
    instanceVersion?: string
): Promise<CertificateBundle | undefined> => {
    try {
        const ecKeyGenParams = { name: 'ECDSA', namedCurve: 'P-384', typedCurve: '' };
        const keyPair = await crypto.subtle.generateKey(ecKeyGenParams, true, ['sign', 'verify']);

        const csr = new CertificationRequest();
        csr.subject.typesAndValues.push(new AttributeTypeAndValue({
            type: '2.5.4.3', // Common name
            value: new PrintableString({ value: 'Test' }),
        }));

        await csr.subjectPublicKeyInfo.importKey(keyPair.publicKey);
        await csr.sign(keyPair.privateKey, 'SHA-384');

        const csrBytes = csr.toSchema().toBER(false);
        const pemCsr = toPem(csrBytes, 'CERTIFICATE REQUEST');

        return await new Promise((resolve, reject) => {
            certificateService.newUserCertFromCsr1(pemCsr, orgMrn, mrn)
                .then(
                    async (cert: any) => {
                        // Handle successful response, e.g., process the certificate if needed
                        const certificateText: string = cert.data;
                        const rawPrivateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
                        const rawPublicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey);

                        const privateKey = new PrivateKeyInfo({ schema: fromBER(rawPrivateKey).result });
                        if (generatePkcs12) {
                            const rawCerts = convertCertChain(certificateText);
                            const certs = rawCerts.map(cert => new Certificate({ schema: fromBER(cert).result }));
                            const password = generatePassword();

                            const pkcs12Keystore = await generatePKCS12(privateKey, certs, password);

                            resolve({
                                certificate: certificateText,
                                publicKey: toPem(rawPublicKey, 'PUBLIC KEY'),
                                privateKey: toPem(rawPrivateKey, 'PRIVATE KEY'),
                                pkcs12Keystore,
                                keystorePassword: password,
                            } as CertificateBundle);
                        } else {
                            console.log({
                                certificate: certificateText,
                                publicKey: toPem(rawPublicKey, 'PUBLIC KEY'),
                                privateKey: toPem(rawPrivateKey, 'PRIVATE KEY'),
                            });
                            resolve({
                                certificate: certificateText,
                                publicKey: toPem(rawPublicKey, 'PUBLIC KEY'),
                                privateKey: toPem(rawPrivateKey, 'PRIVATE KEY'),
                            } as CertificateBundle);
                        }
                    },
                    (err: any) => {
                        console.log(err);
                        // Successful response but failure in PEM fitting to JSON format
                        if (err.status === 201) {
                            resolve(err.error.text); // Return the certificate text on 201 status
                        } else {
                            console.error('Error when trying to issue new certificate:', err.error.message);
                            reject(err); // Reject the promise in case of error
                        }
                    }
                );
        });
    } catch (err) {
        console.error('Error while issuing new certificate:', err);
        return undefined;
    }
}
const toPem = (arrayBuffer: ArrayBuffer, type: string): string => {
    let b64 = Convert.ToBase64(arrayBuffer);
    let finalString = '';
    while (b64.length > 0) {
        finalString += b64.substring(0, 64) + '\n';
        b64 = b64.substring(64);
    }
    return `-----BEGIN ${type}-----\n${finalString}-----END ${type}-----\n`;
}

const convertCertChain = (pemCertChain: string): Array<ArrayBuffer> => {
    let certs = pemCertChain.split(/-----END CERTIFICATE-----/);
    certs = certs.slice(0, certs.length - 1);
    let tmp = certs.map(c => c.split(/-----BEGIN CERTIFICATE-----/)[1].replace(/\n/mg, ''));
    return tmp.map(c => Convert.FromBase64(c));
}

const generatePassword = (): string => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_^$#&!%';
    const values = new Uint32Array(26);
    crypto.getRandomValues(values);
    let result = '';
    for (const element of Array.from(values)) {
        result += charset[element % charset.length];
    }
    return result;
}

const generatePKCS12 = async (privateKey: PrivateKeyInfo, certs: Array<Certificate>, password: string)
    : Promise<ArrayBuffer> => {
    const keyLocalIDBuffer = new ArrayBuffer(4);
    const keyLocalIDView = new Uint8Array(keyLocalIDBuffer);
    getRandomValues(keyLocalIDView);

    const certLocalIDBuffer = new ArrayBuffer(4);
    const certLocalIDView = new Uint8Array(certLocalIDBuffer);
    getRandomValues(certLocalIDView);

    const caCertLocalIDBuffer = new ArrayBuffer(4);
    const caCertLocalIDView = new Uint8Array(caCertLocalIDBuffer);
    getRandomValues(caCertLocalIDView);

    const bitArray = new ArrayBuffer(1);
    const bitView = new Uint8Array(bitArray);

    // tslint:disable-next-line:no-bitwise
    bitView[0] |= 0x80;

    const keyUsage = new BitString({
        valueHex: bitArray,
        unusedBits: 7
    });

    privateKey.attributes = [
        new Attribute({
            type: '2.5.29.15',
            values: [
                keyUsage
            ]
        })
    ];

    let certCn = '';
    certs[0].subject.typesAndValues.forEach(t => {
        if (t.type === '2.5.4.3') {
            certCn = t.value.valueBlock.value;
        }
    });

    let caCn = '';
    certs[1].subject.typesAndValues.forEach(t => {
        if (t.type === '2.5.4.3') {
            caCn = t.value.valueBlock.value;
        }
    });

    const pfx = new PFX({
        parsedValue: {
            integrityMode: 0,
            authenticatedSafe: new AuthenticatedSafe({
                parsedValue: {
                    safeContents: [
                        {
                            privacyMode: 0,
                            value: new SafeContents({
                                safeBags: [
                                    new SafeBag({
                                        bagId: '1.2.840.113549.1.12.10.1.2',
                                        bagValue: new PKCS8ShroudedKeyBag({
                                            parsedValue: privateKey
                                        }),
                                        bagAttributes: [
                                            new Attribute({
                                                type: '1.2.840.113549.1.9.20', // friendlyName
                                                values: [
                                                    new BmpString({ value: 'PKCS8ShroudedKeyBag from PKIjs' })
                                                ]
                                            }),
                                            new Attribute({
                                                type: '1.2.840.113549.1.9.21', // localKeyID
                                                values: [
                                                    new OctetString({ valueHex: keyLocalIDBuffer })
                                                ]
                                            }),
                                            new Attribute({
                                                type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                                                values: [
                                                    new BmpString({ value: 'MCP using https://pkijs.org/' })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        },
                        {
                            privacyMode: 1,
                            value: new SafeContents({
                                safeBags: [
                                    new SafeBag({
                                        bagId: '1.2.840.113549.1.12.10.1.3',
                                        bagValue: new CertBag({
                                            parsedValue: certs[0]
                                        }),
                                        bagAttributes: [
                                            new Attribute({
                                                type: '1.2.840.113549.1.9.20', // friendlyName
                                                values: [
                                                    new BmpString({ value: certCn })
                                                ]
                                            }),
                                            new Attribute({
                                                type: '1.2.840.113549.1.9.21', // localKeyID
                                                values: [
                                                    new OctetString({ valueHex: certLocalIDBuffer })
                                                ]
                                            }),
                                            new Attribute({
                                                type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                                                values: [
                                                    new BmpString({ value: 'MCP using https://pkijs.org/' })
                                                ]
                                            })
                                        ]
                                    }),
                                    new SafeBag({
                                        bagId: '1.2.840.113549.1.12.10.1.3',
                                        bagValue: new CertBag({
                                            parsedValue: certs[1]
                                        }),
                                        bagAttributes: [
                                            new Attribute({
                                                type: '1.2.840.113549.1.9.20', // friendlyName
                                                values: [
                                                    new BmpString({ value: caCn })
                                                ]
                                            }),
                                            new Attribute({
                                                type: '1.2.840.113549.1.9.21', // localKeyID
                                                values: [
                                                    new OctetString({ valueHex: caCertLocalIDBuffer })
                                                ]
                                            }),
                                            new Attribute({
                                                type: '1.3.6.1.4.1.311.17.1', // pkcs12KeyProviderNameAttr
                                                values: [
                                                    new BmpString({ value: 'MCP using https://pkijs.org/' })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }
                    ]
                }
            })
        }
    });
    const passwordConverted = stringToArrayBuffer(password);

    await pfx.parsedValue!.authenticatedSafe!.parsedValue.safeContents[0].value
        .safeBags[0].bagValue.makeInternalValues({
            password: passwordConverted,
            contentEncryptionAlgorithm: {
                name: 'AES-CBC', // OpenSSL can handle AES-CBC only
                length: 128
            },
            hmacHashAlgorithm: 'SHA-1',
            iterationCount: 100000
        });

    await pfx.parsedValue!.authenticatedSafe!.makeInternalValues({
        safeContents: [
            {
                // Empty parameters for first SafeContent since "No Privacy" protection mode there
            },
            {
                password: passwordConverted,
                contentEncryptionAlgorithm: {
                    name: 'AES-CBC', // OpenSSL can handle AES-CBC only
                    length: 128
                },
                hmacHashAlgorithm: 'SHA-1',
                iterationCount: 100000
            }
        ]
    });

    await pfx.makeInternalValues({
        password: passwordConverted,
        iterations: 100000,
        pbkdf2HashAlgorithm: 'SHA-256',
        hmacHashAlgorithm: 'SHA-256'
    })

    return pfx.toSchema().toBER(false);
}

export const downloadPemCertificate = (certificateBundle: CertificateBundle, entityName: string) => {
    try {
        const nameNoSpaces = entityName.split(' ').join('_');

        const zip = new JSZip();
        zip.file("Certificate_" + nameNoSpaces + ".pem", certificateBundle.certificate!);
        if (certificateBundle.privateKey) {
            zip.file("PrivateKey_" + nameNoSpaces + ".pem", certificateBundle.privateKey);
        }
        if (certificateBundle.publicKey) {
            zip.file("PublicKey_" + nameNoSpaces + ".pem", certificateBundle.publicKey);
        }
        if (certificateBundle.pkcs12Keystore) {
            zip.file("Keystore_" + nameNoSpaces + ".p12", certificateBundle.pkcs12Keystore);
        }
        if (certificateBundle.keystorePassword) {
            zip.file("KeystorePassword_" + nameNoSpaces + ".txt", certificateBundle.keystorePassword);
        }
        zip.generateAsync({ type: "blob" }).then(function (content: any) {
            fileSaver.saveAs(content, "Certificate_" + nameNoSpaces + ".zip");
        });
    } catch (error) {
        console.error("Error downloading certificate:", error);
    }
}