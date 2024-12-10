import { Box, Spinner } from 'grommet';

const FullScreenSpinner = () => (
  <Box
    fill
    align="center"
    justify="center"
    background={{ color: 'rgba(0, 0, 0, 0.5)' }} // Gray-transparent background
    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }} // Cover the whole window
  >
    <Spinner size="large" />
  </Box>
);

export default FullScreenSpinner;