import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/tasksSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
const FilterTasks = () => {
    const buttons = [
        <Button key="one" onClick={() => dispatch(setFilter('all'))}>All</Button>,
        <Button key="two" onClick={() => dispatch(setFilter('completed'))}>Completed</Button>,
        <Button key="three" onClick={() => dispatch(setFilter('incomplete'))}>Incomplete</Button>,
    ];
    const dispatch = useDispatch();

    return (
        <div>
            {/*<button onClick={() => dispatch(setFilter('all'))}>All</button>*/}
            {/*<button onClick={() => dispatch(setFilter('completed'))}>Completed</button>*/}
            {/*<button onClick={() => dispatch(setFilter('incomplete'))}>Incomplete</button>*/}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >

            <ButtonGroup size="large" aria-label="Large button group">
                {buttons}
            </ButtonGroup>
            </Box>
        </div>
    );
};

export default FilterTasks;