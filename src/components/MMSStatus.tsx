import React from 'react';
import { Box, Text, Tip } from 'grommet';
import { CircleInformation } from 'grommet-icons';

// Define the possible statuses and colors
export enum MMSConnStatus {
    NotConnected = 'notConnected',
    Unauthenticated = 'unauthenticated',
    Connected = 'connected',
    Problem = 'problem',
}

const statusColors: Record<MMSConnStatus, string> = {
  notConnected: 'gray',
  unauthenticated: 'yellow',
  connected: 'green',
  problem: 'red',
};

// Define props for the component
interface MMSStatusProps {
  status: MMSConnStatus; // Required prop to specify the status
  mrn: string; // Required prop to specify the MRN
}

const MMSStatus: React.FC<MMSStatusProps> = ({ status, mrn }) => {
  const color = statusColors[status] || 'gray';

  return (
      <Box
      direction="row"
      align="center"
      pad="small"
      gap="small"
      border={{ color: 'light-4', size: 'small' }}
      round="small"
      background="light-1"
    >
      {/* Circle icon for the status */}
      <Tip content="Your MMS connection status">
      <Box
        width="12px"
        height="12px"
        round="full"
        background={color}
        border={{ color: 'dark-2', size: 'xsmall' }}
      />
      </Tip>

      {/* Text for MMS */}
      <Text size="medium" weight="bold" color="dark-2">
        MMS
      </Text>
      <Text size="small" weight="bold" color="dark-2">
        {mrn}
      </Text>

      {/* Optional additional icon */}
      <CircleInformation color="dark-3" size="small" />
      </Box>
  );
};

export default MMSStatus;
