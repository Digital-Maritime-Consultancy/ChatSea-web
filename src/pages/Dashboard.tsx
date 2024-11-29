import React, { useEffect, useState } from 'react';
import { Box, Grid, Heading, Paragraph, Chart, DataTable, Diagram, Calendar, Meter, PageHeader, Button } from 'grommet';
import useKeycloak from '../hooks/useKeycloak';

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ChartType, SortableItem } from '../components/SortableItem';import { UserManagementControllerApi } from '../backend-api/saas-management';

// Main Dashboard Component
const Dashboard = () => {
    const {keycloak, authenticated, username, orgMrn, mrn} = useKeycloak();
    const [items, setItems] = useState([1,2,3]);
    const [token, setToken] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);
    const userController = new UserManagementControllerApi();
    const content= 
        [
        {
            id: 1,
            title: 'Service Usage',
            description: 'The usage of services is shown in this chart.',
            chartType: ChartType.Bar,
        },
        {
            id: 2,
            title: 'Total Cost',
            description: 'The total cost for this month is shown in this chart.',
            chartType: ChartType.Text,
            text: '$1000',
        },
        {
            id: 3,
            title: 'MMS Network Status',
            description: 'Currently working MMS Routers are shown in dots.',
            chartType: ChartType.Map,
        },
        {
            id: 4,
            title: 'Your Certificates',
            description: 'Active certificates are shown in this chart.',
            chartType: ChartType.Bar,
        },];
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const [name, setName] = useState<string>("");
    useEffect(() => {
        if (keycloak && authenticated) {
            setName(username);
            setToken(keycloak?.token || "");
            userController.getUserServiceSubscriptions(orgMrn, mrn).then((response) => {
                console.log(response.data);
            });
        }
        
    }, [authenticated]);

    const handleDelete = (id: any) => {
        setItems((prevItems) => prevItems.filter((item) => item !== id));
      };

    return (
        <Box pad="large" background="light-2">
            <PageHeader
    title={`Welcome, ${name}`}
    subtitle="Dashboard for you"
    actions={<Button label={isEditing ? "Save" : "Edit"} primary onClick={()=>setIsEditing(!isEditing)}/>}
/>
            {isEditing ? (
                <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(item => {
                        const foundItem = content.find(t => t.id === item);
                        return foundItem ? (
                            <SortableItem
                                key={item}
                                id={item}
                                title={foundItem.title}
                                description={foundItem.description}
                                chartType={foundItem.chartType}
                                text={foundItem.text}
                                onDelete={handleDelete}
                                isEditing={isEditing}
                            />
                        ) : null;
                    })}
                    {/* {items.map(item => <SortableItem key={item.id} id={item.id} title={item.title} description={item.description} chartType={item.chartType} text={item.text}/>)} */}
                </SortableContext>
            </DndContext>
                ) : (
<SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(item => {
                        const foundItem = content.find(t => t.id === item);
                        return foundItem ? (
                            <SortableItem
                                key={item}
                                id={item}
                                title={foundItem.title}
                                description={foundItem.description}
                                chartType={foundItem.chartType}
                                text={foundItem.text}
                                onDelete={handleDelete}
                                isEditing={isEditing}
                            />
                        ) : null;
                    })}
                    {/* {items.map(item => <SortableItem key={item.id} id={item.id} title={item.title} description={item.description} chartType={item.chartType} text={item.text}/>)} */}
                </SortableContext>
                )}
            {isEditing && content.map((item) => (
                items.includes(item.id) ? null : (
                    <Button key={item.id} label={`Add ${item.title}`} onClick={() => setItems([...items, item.id])} />
                )
            ))}
        </Box>
    );

    async function handleDragEnd(event: any) {
        const { active, over } = event;
        if (active.id !== over.id) {
            await setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    //   return (



    // {/* DataTable Section */ }
    //     <Box gridArea="desc2" background="light-1" pad="small">
    //       <Heading level={3} margin="none">
    //         Task Overview
    //       </Heading>
    //       <Paragraph>Check the current status of tasks, their progress, and priorities.</Paragraph>
    //     </Box>
    //     <Box gridArea="datatable" background="white" pad="small">
    //       <DataTable
    //         columns={[
    //           { property: 'name', header: <strong>Task Name</strong>, primary: true },
    //           { property: 'status', header: 'Status' },
    //           { property: 'progress', header: 'Progress (%)' },
    //         ]}
    //         data={tableData}
    //         size="medium"
    //       />
    //     </Box>

    // {/* Diagram Section */ }
    //     <Box gridArea="desc3" background="light-1" pad="small">
    //       <Heading level={3} margin="none">
    //         Workflow Diagram
    //       </Heading>
    //       <Paragraph>Visualize your workflow and task dependencies using this diagram.</Paragraph>
    //     </Box>
    //     <Box gridArea="diagram" background="white" pad="small" align="center">
    //       <Diagram
    //         connections={connections}
    //       />
    //       <Box id="node1" background="brand" pad="small" margin="xsmall" />
    //       <Box id="node2" background="accent-1" pad="small" margin="xsmall" />
    //       <Box id="node3" background="accent-2" pad="small" margin="xsmall" />
    //     </Box>

    // {/* Calendar Section */ }
    //     <Box gridArea="desc4" background="light-1" pad="small">
    //       <Heading level={3} margin="none">
    //         Upcoming Events
    //       </Heading>
    //       <Paragraph>View your calendar and track upcoming deadlines and meetings.</Paragraph>
    //     </Box>
    //     <Box gridArea="calendar" background="white" pad="small">
    //       <Calendar date={new Date().toISOString()} />
    //     </Box>

    // {/* Meter Section */ }
    //     <Box gridArea="desc5" background="light-1" pad="small">
    //       <Heading level={3} margin="none">
    //         Resource Utilization
    //       </Heading>
    //       <Paragraph>Track resource usage and efficiency using this meter.</Paragraph>
    //     </Box>
    //     <Box gridArea="meter" background="white" pad="small" align="center">
    //       <Meter
    //         values={[{ value: 70, label: 'CPU Usage', color: 'accent-1' }]}
    //         aria-label="Resource Utilization"
    //       />
    //     </Box>
    //   );
};

export default Dashboard;
