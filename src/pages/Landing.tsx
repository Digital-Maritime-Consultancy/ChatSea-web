import { Button, PageHeader } from "grommet";


function Landing() {
    return (
        <PageHeader
    title="ChatSea"
    subtitle="Service for chatting with friends"
    actions={<Button label="Login" primary onClick={() => window.location.href = '/dashboard'} />}
/>
    );
}

export default Landing;