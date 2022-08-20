import React, { FC } from 'react';
import Item from './Item';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddRounded';
import { ListBuilder, DataItem } from '../types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const Main: FC<ListBuilder> = ({ form, name, defaultValue, template: Template, onAddItem }) => {
    React.useEffect(() => {
        if (!form?.get(name)) {
            if (defaultValue) {
                form?.set(name, defaultValue);
            } else {
                form?.set(name, []);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value: DataItem[] = form.get(name) || [];

    return (
        <DragDropContext
            onDragEnd={(result) => {
                if (!result.destination) return;
                form.set(name, reorder(value, result.source.index, result.destination.index));
            }}
        >
            <Stack spacing={2}>
                <Box>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {value.map((item, index) => (
                                    <Draggable key={index} draggableId={item.id.toString()} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={provided.draggableProps.style}>
                                                <Item
                                                    title={item.title}
                                                    render={<Template />}
                                                    onClose={() => {
                                                        value.splice(index, 1);
                                                        form.set(name, [...value]);
                                                    }}
                                                    onTitleEdit={(text) => {
                                                        value[index] = { ...value[index], title: text };
                                                        form.set(name, [...value]);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box flex={1}></Box>
                    <Box>
                        {onAddItem && (
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={async () => {
                                    const item = await onAddItem();
                                    if (item) {
                                        form.set(name, [...value, item]);
                                    }
                                }}
                            >
                                Add Item
                            </Button>
                        )}
                    </Box>
                </Stack>
            </Stack>
        </DragDropContext>
    );
};

export default Main;
