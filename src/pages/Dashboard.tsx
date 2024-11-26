import React, { useEffect, useState } from 'react';
import { Box, Grid, Heading, Paragraph, Chart, DataTable, Diagram, Calendar, Meter } from 'grommet';
import useKeycloak from '../hooks/useKeycloak';

// Sample data for DataTable
const tableData = [
  { name: 'Task 1', status: 'Completed', progress: 100 },
  { name: 'Task 2', status: 'In Progress', progress: 60 },
  { name: 'Task 3', status: 'Pending', progress: 20 },
];

// Diagram connections
const connections = [
  { fromTarget: 'node1', toTarget: 'node2', color: 'accent-1', thickness: 'xsmall' },
  { fromTarget: 'node2', toTarget: 'node3', color: 'accent-2', thickness: 'xsmall' },
];

// Main Dashboard Component
const Dashboard = () => {
    const {username} = useKeycloak();
    const [name, setName] = useState<string>("");
    useEffect(() => {
        setName(username);
    }, [username]);
  return (
    <Box pad="large" background="light-2">
      <Heading level={2} alignSelf="center">
        Welcome, {name}
      </Heading>
      <Grid
        rows={['auto', 'auto', 'auto', 'auto', 'auto']}
        columns={['1/4', '3/4']}
        gap="medium"
        areas={[
          { name: 'desc1', start: [0, 0], end: [0, 0] },
          { name: 'chart', start: [1, 0], end: [1, 0] },
          { name: 'desc2', start: [0, 1], end: [0, 1] },
          { name: 'datatable', start: [1, 1], end: [1, 1] },
          { name: 'desc3', start: [0, 2], end: [0, 2] },
          { name: 'diagram', start: [1, 2], end: [1, 2] },
          { name: 'desc4', start: [0, 3], end: [0, 3] },
          { name: 'calendar', start: [1, 3], end: [1, 3] },
          { name: 'desc5', start: [0, 4], end: [0, 4] },
          { name: 'meter', start: [1, 4], end: [1, 4] },
        ]}
      >
        {/* Chart Section */}
        <Box gridArea="desc1" background="light-1" pad="small">
          <Heading level={3} margin="none">
            Sales Performance
          </Heading>
          <Paragraph>
            This chart shows sales performance over the last 12 months. Monitor trends and identify patterns.
          </Paragraph>
        </Box>
        <Box gridArea="chart" background="white" pad="small">
          <Chart
            type="line"
            values={[
              { value: [1, 10] },
              { value: [2, 20] },
              { value: [3, 30] },
              { value: [4, 15] },
              { value: [5, 40] },
              { value: [6, 25] },
            ]}
            aria-label="Sales Performance Chart"
          />
        </Box>

        {/* DataTable Section */}
        <Box gridArea="desc2" background="light-1" pad="small">
          <Heading level={3} margin="none">
            Task Overview
          </Heading>
          <Paragraph>Check the current status of tasks, their progress, and priorities.</Paragraph>
        </Box>
        <Box gridArea="datatable" background="white" pad="small">
          <DataTable
            columns={[
              { property: 'name', header: <strong>Task Name</strong>, primary: true },
              { property: 'status', header: 'Status' },
              { property: 'progress', header: 'Progress (%)' },
            ]}
            data={tableData}
            size="medium"
          />
        </Box>

        {/* Diagram Section */}
        <Box gridArea="desc3" background="light-1" pad="small">
          <Heading level={3} margin="none">
            Workflow Diagram
          </Heading>
          <Paragraph>Visualize your workflow and task dependencies using this diagram.</Paragraph>
        </Box>
        <Box gridArea="diagram" background="white" pad="small" align="center">
          <Diagram
            connections={connections}
          />
          <Box id="node1" background="brand" pad="small" margin="xsmall" />
          <Box id="node2" background="accent-1" pad="small" margin="xsmall" />
          <Box id="node3" background="accent-2" pad="small" margin="xsmall" />
        </Box>

        {/* Calendar Section */}
        <Box gridArea="desc4" background="light-1" pad="small">
          <Heading level={3} margin="none">
            Upcoming Events
          </Heading>
          <Paragraph>View your calendar and track upcoming deadlines and meetings.</Paragraph>
        </Box>
        <Box gridArea="calendar" background="white" pad="small">
          <Calendar date={new Date().toISOString()} />
        </Box>

        {/* Meter Section */}
        <Box gridArea="desc5" background="light-1" pad="small">
          <Heading level={3} margin="none">
            Resource Utilization
          </Heading>
          <Paragraph>Track resource usage and efficiency using this meter.</Paragraph>
        </Box>
        <Box gridArea="meter" background="white" pad="small" align="center">
          <Meter
            values={[{ value: 70, label: 'CPU Usage', color: 'accent-1' }]}
            aria-label="Resource Utilization"
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;
