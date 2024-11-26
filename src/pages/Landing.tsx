import { Box, Button, Heading, Main, Text, Page, PageContent, PageHeader, Paragraph } from "grommet";
import useKeycloak from "../hooks/useKeycloak";


function Landing() {
    const { keycloak, authenticated } = useKeycloak();
    const handleLogin = () => {
        if (keycloak) {
            keycloak.login();
        }
    }

    return (
        <Main pad="large">
            <Box
                fill
                align="center"
                justify="center"
                background={{
                    color: 'gray',
                    //image: 'url(https://source.unsplash.com/1600x900/?sea,ocean)',
                }}
                pad="large"
                >
                <Box
                    pad="medium"
                    background={{ color: 'rgba(255, 255, 255, 0.9)', opacity: 'strong' }}
                    round="medium"
                    align="center"
                    justify="center"
                    gap="medium"
                    elevation="medium"
                >
                    <Heading level={1} margin="none" color="brand">
                    ChatSea
                    </Heading>
                    <Text size="large" textAlign="center" color="dark-2">
                    Seamless and Secure Chat for Everyone
                    </Text>
                    <Button
                    label="Login"
                    onClick={handleLogin}
                    primary
                    color="brand"
                    />
                </Box>
                </Box>
        </Main>
    );
}

export default Landing;