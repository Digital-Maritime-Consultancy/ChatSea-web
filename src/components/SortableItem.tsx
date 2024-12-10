import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Button, Chart, Grid, Heading, Paragraph, WorldMap } from 'grommet';

export enum ChartType {
    Map = 'Map',
    Bar = 'Bar',
    Text = 'Text',
}

export interface SortableItemProps {
    id: any;
    isEditing: boolean;
    title: string;
    description: string;
    chartType: ChartType;
    values?: { value: [number, number] }[];
    text?: string;
    onDelete: (id: any) => void;
}

export function SortableItem(props: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>
            { props.isEditing && <Button primary label={`Delete ${props.title}`} onClick={()=>props.onDelete(props.id)}/> }
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Grid
                rows={['auto']}
                columns={['1/4', '3/4']}
                gap="medium"
                areas={[
                    { name: 'desc1', start: [0, 0], end: [0, 0] },
                    { name: 'chart', start: [1, 0], end: [1, 0] },
                ]}
            >
                <Box gridArea="desc1" background="light-1" pad="large">
                    <Heading level={3} margin="none">
                        {props.title}
                    </Heading>
                    <Paragraph>
                        {props.description}
                    </Paragraph>
                </Box>
                <Box gridArea="chart" align="center" background="white" pad="small">
                    {props.chartType === ChartType.Map && (
                        <WorldMap 
                        color="graph-0"
                        places={[
                            {
                                name: 'Korea',
                                location: [36.782580, 127.004103],
                                color: 'graph-2',
                                onClick: (name) => {},
                              },
                            {
                              name: 'Japan',
                              location: [35.825522, 139.755318],
                              color: 'graph-2',
                              onClick: (name) => {},
                            },
                          ]}
                        />)}
                    {props.chartType === ChartType.Bar && (
                    <Chart
                        bounds={[[0, 7], [0, 100]]}
                        values={[
                        { value: [7, 100], label: 'one hundred' },
                        { value: [6, 70], label: 'seventy' },
                        { value: [5, 60], label: 'sixty' },
                        { value: [4, 80], label: 'eighty' },
                        { value: [3, 40], label: 'forty' },
                        { value: [2, 0], label: 'zero' },
                        { value: [1, 30], label: 'thirty' },
                        { value: [0, 60], label: 'sixty' },
                        ]}
                        aria-label="chart"
                    />)}
                    {props.chartType === ChartType.Text && (
                        <Box>
                            <Heading level={1} margin="none">
                                {props.text}
                            </Heading>
                        </Box>
                    )}
                </Box>
            </Grid>

        </div>
        </>
        
    );
}