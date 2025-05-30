import React, {useContext, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {toggleTask, deleteTask, setSearch, toggleEdit, editTask} from '../redux/tasksSlice';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeContext } from '../ThemeContext';
import {Input as Inputt} from "@mui/material"; // Import the ThemeContext
import EditIcon from '@mui/icons-material/Edit';
import {CheckCircleOutlined} from "@mui/icons-material";
import { styled } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';










export default function TaskTable() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [forceRerender, setForceRerender] = React.useState(true);
    const { theme } = useContext(ThemeContext); // Use the ThemeContext

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangeInput = (e)=>{

        tasks.forEach(task => dispatch(setSearch({taskId:task.id, inc:task.text.toLowerCase().includes(e.target.value.toLowerCase())})))
    }


    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed'  ) return task.completed;
        if (filter === 'incomplete' ) return !task.completed;
        return true;
    });
    const StyledInput = styled('input')({
        border: 'none', // remove the native input border
        minWidth: 0, // remove the native input width
        outline: 0, // remove the native input outline
        padding: 0, // remove the native input padding
        paddingTop: '1em',
        flex: 1,
        color: 'inherit',
        backgroundColor: 'transparent',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        textOverflow: 'ellipsis',
        '&::placeholder': {
            opacity: 0,
            transition: '0.1s ease-out',
        },
        '&:focus::placeholder': {
            opacity: 1,
        },
        '&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label': {
            top: '0.5rem',
            fontSize: '0.75rem',
        },
        '&:focus ~ label': {
            color: 'var(--Input-focusedHighlight)',
        },
        '&:-webkit-autofill': {
            alignSelf: 'stretch', // to fill the height of the root slot
        },
        '&:-webkit-autofill:not(* + &)': {
            marginInlineStart: 'calc(-1 * var(--Input-paddingInline))',
            paddingInlineStart: 'var(--Input-paddingInline)',
            borderTopLeftRadius:
                'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
            borderBottomLeftRadius:
                'calc(var(--Input-radius) - var(--variant-borderWidth, 0px))',
        },
    });

    const StyledLabel = styled('label')(({ theme }) => ({
        position: 'absolute',
        lineHeight: 1,
        top: 'calc((var(--Input-minHeight) - 1em) / 2)',
        color: theme.vars.palette.text.tertiary,
        fontWeight: theme.vars.fontWeight.md,
        transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    }));

    const editInputRef = useRef();
    const handelEditChange = (e,id)=>{
        if(editInputRef.current.children.item(0).value!=""){
            dispatch(editTask({taskId: id, newText: editInputRef.current.children.item(0).value}))

            dispatch(toggleEdit(id))
        }

    }

    return (
        <Paper sx={{
            width: '100%',
            backgroundColor: theme === 'darkMode' ? '#2C2C2C' : '#ffffff',
        }}>
            <TableContainer sx={{
                maxHeight: 440,
                overflowY: 'auto', // Enables scrolling
                '&::-webkit-scrollbar': {
                    width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                    background: theme === 'darkMode' ? '#444' : '#ddd',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: theme === 'darkMode' ? '#8e8e8e' : '#2e2e2e',
                    borderRadius: '5px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: theme === 'darkMode' ? '#2e2e2e' : '#8e8e8e',
                },
            }}>
                <Table stickyHeader aria-label="task table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"
                                       sx={{
                                           backgroundColor: theme === 'darkMode' ? '#121212' : '#ffffff',
                                           color: theme === 'darkMode' ? '#ffffff' : '#000000'
                                       }}>
                                <Inputt
                                    sx={{"&::before":{borderBottomColor:theme === 'darkMode' ? '#ffffff' : '#000000'},width:558, color: theme === 'darkMode' ? '#ffffff' : '#000000',borderBottomColor:'#121212'}}
                                    color="primary"
                                    placeholder="search..."
                                    size="lg"
                                    onChange={handleChangeInput}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* eslint-disable-next-line array-callback-return */}
                        {filteredTasks.filter((e) => e.include ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                            <TableRow hover role="checkbox" key={task.id}>
                                <TableCell sx={{ color: theme === 'darkMode' ? '#ffffff' : '#000000' }}>
                                    {task.editing === false ?<ListItem sx={{"&::before":{borderBottomColor:theme === 'darkMode' ? '#ffffff' : '#000000'},}} key={task.id} secondaryAction={
                                        <div>

                                            <IconButton edge="end" aria-label="delete"
                                                        >
                                                <EditIcon sx={{color: theme === 'darkMode' ? '#ffffff' : '#000000'}} onClick={() =>  dispatch(toggleEdit(task.id)) }/>
                                            </IconButton>
                                            <IconButton sx={{marginLeft: 1}} edge="end" aria-label="delete"
                                                        onClick={() => dispatch(deleteTask(task.id))}>
                                                <DeleteIcon sx={{color: theme === 'darkMode' ? '#ffffff' : '#000000'}}/>
                                            </IconButton>

                                        </div>

                                    } disablePadding>
                                        <ListItemButton role={undefined} onClick={() => dispatch(toggleTask(task.id))}
                                                        dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={task.completed}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': task.id}}
                                                    sx={{color: theme === 'darkMode' ? '#ffffff' : '#000000'}}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={task.id} primary={task.text} sx={{
                                                marginLeft: -3,
                                                marginRight: 4,
                                                color: theme === 'darkMode' ? '#ffffff' : '#000000'
                                            }}/>
                                        </ListItemButton>
                                    </ListItem>:
                                        <div>

                                            <Inputt
                                                endDecorator={<CheckCircleOutlineIcon />}
                                                slots={{ input:
                                                        React.forwardRef(function InnerInput(props, ref) {
                                                            const id = React.useId();
                                                            return (
                                                                <React.Fragment>
                                                                    <StyledInput {...props} ref={ref} id={id} />
                                                                    <StyledLabel htmlFor={id}>{task.text}</StyledLabel>
                                                                </React.Fragment>
                                                            );
                                                        })
                                            }}
                                                slotProps={{ input: { placeholder: 'Edit...', type: 'text' } }}
                                                sx={{"&::before":{borderBottomColor:theme === 'darkMode' ? '#ffffff' : '#000000'}, '--Input-minHeight': '56px', '--Input-radius': '6px',width:486,maxWidth:486,height:60 ,color: theme === 'darkMode' ? '#ffffff' : '#000000' }}
                                                ref={editInputRef}
                                                size={"lg"}
                                            />
                                            <IconButton sx={{marginLeft: 1,color: theme === 'darkMode' ? '#ffffff' : '#000000',}} edge="end" aria-label="done"
                                                        onClick={(e)=>{handelEditChange(e,task.id)}}>
                                                <CheckCircleOutlineIcon/>
                                            </IconButton>
                                            <IconButton sx={{marginLeft: 1,color: theme === 'darkMode' ? '#ffffff' : '#000000',}} edge="end" aria-label="done"
                                                        onClick={()=>{dispatch(toggleEdit(task.id))}} ><CancelIcon/>

                                            </IconButton>

                                        </div>
                                        }

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredTasks.filter((e) => e.include ).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: theme === 'darkMode' ? '#ffffff' : '#000000' }}
            />
        </Paper>
    );
}
