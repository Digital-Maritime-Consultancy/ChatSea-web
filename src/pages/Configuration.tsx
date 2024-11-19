import { Box, Button, FileInput, Heading, Main, Paragraph, Select } from "grommet";
import { useState } from "react";
import { loadCertAndPrivateKeyFromFiles } from "../mms-browser-agent/core";

function Configuration() {
    const [file, setFile] = useState<File | null>(null);

  const handleConnect = async () => {
    await loadCertAndPrivateKeyFromFiles();
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
          margin={{ bottom: "medium" }}
        />
        <Heading level={3}>Select certificate</Heading>
        <FileInput name="certificate" />
        <Heading level={3}>Select private key</Heading>
        <FileInput name="privateKey" />
      </Box>
      <Box pad={{ top: "medium" }}>
        <Button label="Connect" primary onClick={handleConnect} />
      </Box>
      
        </Main>
        
    );
}

export default Configuration;