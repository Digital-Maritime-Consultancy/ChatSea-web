import { Box, Button, FileInput, Heading, Main, Paragraph, Select } from "grommet";
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
      });
    });
  };

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
      </Box>
      <Box pad={{ top: "medium" }}>
        <Button label="Connect" primary onClick={handleConnect} />
      </Box>

    </Main>

  );
}

export default Configuration;