import { Box, Button, Heading, Main, Text, Page, PageContent, PageHeader, Paragraph, Spinner } from "grommet";
import useKeycloak from "../hooks/useKeycloak";
import { useEffect, useState } from "react";


function Landing() {
    const { keycloak, authenticated } = useKeycloak();
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const handleLogin = async () => {
        if (keycloak) {
            setLoading(true);
            try {
                await keycloak.login();
            } finally {
                setLoading(false);
                setRedirect(true);
            }
        }
    }

    useEffect(() => {
        if (authenticated) {
            window.location.href = "/dashboard";
        }
    }, [authenticated]);

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
                {loading ? (
                    <Spinner size="medium" />
                ) : 
                redirect ? (
                    <Spinner size="medium" />
                ) : (
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
                            MaaS Service Portal for everyone
                        </Text>
                        <Button
                            label="Login"
                            onClick={handleLogin}
                            primary
                            color="brand"
                        />
                    </Box>
                )}
            </Box>


        </Main>
    );
}

export default Landing;