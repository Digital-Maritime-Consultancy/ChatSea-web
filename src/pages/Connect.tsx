import { Text, Box, Button, Card, CardBody, CardHeader, FileInput, Heading, Layer, Main, Select, CardFooter } from "grommet";
import { useEffect, useState } from "react";
import { loadCertAndPrivateKeyFromFiles } from "../mms-browser-agent/core";
import { Certificate } from "pkijs";
import { useMmsContext } from "../context/MmsContext";
import { useNavigate } from "react-router-dom";
import useKeycloak from "../hooks/useKeycloak";
import { Configuration } from "../backend-api/identity-registry";
import { BASE_PATH } from "../backend-api/identity-registry/base";
import { downloadPemCertificate, issueNewWithLocalKeys } from "../util/certUtil";
import { CertificateBundle } from "../util/certificateBundle";
import { UserControllerApi } from "../backend-api/identity-registry/apis/user-controller-api";

const Connect = () => {
  const [certFile, setCertFile] = useState<File | null>(null);
  const [privKeyFile, setPrivKeyFile] = useState<File | null>(null);
  const [wsUrl, setWsUrl] = useState<string>("");
  const { connect, connected } = useMmsContext();
  const { keycloak, authenticated, token, mrn, orgMrn } = useKeycloak();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [certUnitPrice, setCertUnitPrice] = useState(100);
  const [certificateBundle, setCertificateBundle] = useState<CertificateBundle | undefined>(undefined);

  useEffect(() => {
    if (connected) {
      navigate('/dashboard');
    }
  }, [connected]);

  const readMrnFromCert = (cert: Certificate): string => {
    let ownMrn = "";
    for (const rdn of cert.subject.typesAndValues) {
      if (rdn.type === "0.9.2342.19200300.100.1.1") {
        ownMrn = rdn.value.valueBlock.value;
        break;
      }
    }
    return ownMrn;
  }

  const selectHeaderAccept = (accepts: string[]): string | undefined => {
    return accepts.find(accept => accept === 'application/json') || accepts[0];
  }

  const selectHeaderContentType = (consumes: string[]): string | undefined => {
    return consumes.find(contentType => contentType === 'application/x-pem-file') || consumes[0];
  }

  const issueCert = () => {
    if (!authenticated) {
      alert("Please login to issue new certificate");
    } else {
      // Define Content-Type headers
      const consumes: string[] = [
        'application/x-pem-file',
        'text/plain',
      ];
      const httpContentTypeSelected: string | undefined = selectHeaderContentType(consumes);

      // Define Accept headers
      const httpHeaderAccepts: string[] = [
        'application/json',
        'application/pem-certificate-chain',
      ];
      const httpHeaderAcceptSelected: string | undefined = selectHeaderAccept(httpHeaderAccepts);
      const apiConfig: Configuration = {
        basePath: BASE_PATH,
        baseOptions: {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': httpHeaderAcceptSelected,
            'Content-Type': httpContentTypeSelected,
          },
        },
      };

      const userService = new UserControllerApi(apiConfig);
      issueNewWithLocalKeys(userService, mrn, orgMrn, false).then((cert) => {
        setCertificateBundle(cert);
        console.log(cert);
        setDownloadReady(true);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

    const downloadCert = () => {
      downloadPemCertificate(certificateBundle!, mrn);
    }

    const handleConnect = () => {
      if (!certFile || !privKeyFile) {
        alert("Please select certificate and private key files");
        return;
      }
      if (wsUrl.length === 0) {
        alert("Please select Edge Router you want to connect to");
        return;
      }
      loadCertAndPrivateKeyFromFiles(certFile, privKeyFile).then(async (certBundle) => {
        const mrn = readMrnFromCert(certBundle.certificate);
        connect(wsUrl, certBundle.privateKey, certBundle.certificate, mrn)
      });
      console.log("Config done")
    };

    return (
      <Main pad="large">
        <Heading>Connection to MMS Network</Heading>
        <Box>
          <Heading level={3}>Select MMS Edge router</Heading>
          <Select
            options={[
              { label: "NHN Korea Edgerouter", value: "wss://kr-er.aivn.kr:8888" },
              { label: "NHN Japan Edgerouter", value: "wss://jp-er.aivn.kr:8888" },
              // { label: "Korea Edge Router", value: "wss://kr-edgerouter.dmc.international:8888" },
              // { label: "EU Edge Router", value: "wss://eu-edgerouter.dmc.international:8888" },
            ]}
            placeholder="Select MMS Edge Router"
            onChange={({ option }) => setWsUrl(option!.value as string)}
          />
          <Heading level={3}>Select certificate</Heading>
          <FileInput name="certificate" onChange={({ target: { files } }) => setCertFile(files![0])} />
          <Heading level={3}>Select private key</Heading>
          <FileInput name="privateKey" onChange={({ target: { files } }) => setPrivKeyFile(files![0])} />
          <Heading level={4}>Don't have certificate and private key?</Heading>
          <Button label="Click here to issue new certificate and private key" secondary onClick={() => setShow(true)} />
          {show && (
            <Layer
              onEsc={() => setShow(false)}
              onClickOutside={() => setShow(false)}
            >
              <Card>
                <CardHeader pad="small"><Heading level={3}>Issue new certificate</Heading></CardHeader>
                <CardBody pad="small">
                  {!downloadReady ? (
                    <Text>Issue a new MCP certificate?</Text>
                  ) : (
                    <Text>Your certificate is ready for download.</Text>
                  )}
                </CardBody>
                <CardFooter pad="small" background="light-2">
                  {!downloadReady ? (
                    <Button label="Proceed" onClick={issueCert} primary />
                  ) : (
                    <Button label="Download" onClick={() => downloadCert()} primary />
                  )}
                  <Button label="Close" onClick={() => setShow(false)} />
                </CardFooter>
              </Card>

            </Layer>
          )}

        </Box>
        <Box pad={{ top: "medium" }}>
          <Button label="Connect" primary onClick={handleConnect} />
        </Box>

      </Main>

    );
  }

  export default Connect;
