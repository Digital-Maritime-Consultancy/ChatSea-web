import { Box, Button, Card, CardBody, CardFooter, CardHeader, FileInput, Heading, Layer, Main, Paragraph, Select, Text } from "grommet";
import { useContext, useState } from "react";
import { useConnectionState, useConnectionStateDispatch } from "../context/ConnectContext";
import { loadCertAndPrivateKeyFromFiles } from "../mms-browser-agent/core";
import { Certificate } from "pkijs";

export interface ConfigurationProp {
  connect: () => void;
}

const Configuration = ({ connect }: ConfigurationProp) => {
  const connectionState = useConnectionState();
  const setConnectionState = useConnectionStateDispatch();
  const [certFile, setCertFile] = useState<File | null>(null);
  const [privKeyFile, setPrivKeyFile] = useState<File | null>(null);
  const [wsUrl, setWsUrl] = useState<string>("");
  const [show, setShow] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

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
      await setConnectionState({
        ...connectionState,
        certificate: certBundle.certificate,
        privateKey: certBundle.privateKey,
        privateKeyEcdh: certBundle.privateKeyEcdh,
        wsUrl: wsUrl,
        mrn: mrn,
        ws: undefined,
      });
    });
  };

  const issueCert = () => {
    setDownloadReady(true);
  }

  const downloadCert = () => {

  }

  return (
    <Main pad="large">
      <Heading>Configuration</Heading>
      <Box>
        <Heading level={3}>Select MMS Edge router</Heading>
        <Select
          options={[
            { label: "Korea Edge Router", value: "wss://kr-edgerouter.dmc.international:8888" },
            { label: "EU Edge Router", value: "wss://eu-edgerouter.dmc.international:8888" },
          ]}
          placeholder="Select MMS Edge Router"
          onChange={({ option }) => setWsUrl(option!.value as string)}
        />
        <Heading level={3}>Select certificate</Heading>
        <FileInput name="certificate" onChange={({ target: { files } }) => setCertFile(files![0])} />
        <Heading level={3}>Select private key</Heading>
        <FileInput name="privateKey" onChange={({ target: { files } }) => setPrivKeyFile(files![0])} />
        <Heading level={4}>Don't have certificate and private key?</Heading>
        <Button label="Click here to issue new certificate and private key" secondary onClick={() => setShow(true)}/>
        {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Card>
            <CardHeader pad="small"><Heading level={3}>Issue new certificate</Heading></CardHeader>
            <CardBody pad="small">
            {!downloadReady ? (
              <Text>Certificate service will cost 100 USD per a new cert. Do you want to proceed?</Text>
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

export default Configuration;