import { Text, Box, Button, Card, CardBody, CardHeader, FileInput, Heading, Layer, Main, Select, CardFooter } from "grommet";
import { useEffect, useState } from "react";
import { loadCertAndPrivateKeyFromFiles } from "../mms-browser-agent/core";
import { Certificate } from "pkijs";
import {useMmsContext} from "../context/MmsContext";
import { useNavigate } from "react-router-dom";

const Configuration = () => {
  const [certFile, setCertFile] = useState<File | null>(null);
  const [privKeyFile, setPrivKeyFile] = useState<File | null>(null);
  const [wsUrl, setWsUrl] = useState<string>("");
  const {connect, connected} = useMmsContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [certUnitPrice, setCertUnitPrice] = useState(100);

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

  const issueCert = () => {
    setDownloadReady(true);
  }

  const downloadCert = () => {

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
              <Text>Certificate service will cost {certUnitPrice} USD per a new cert. Do you want to proceed?</Text>
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