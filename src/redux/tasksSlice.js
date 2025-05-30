import { createSlice } from '@reduxjs/toolkit';

const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState = {
    tasks: loadTasks(),
    filter: 'all',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
                include:true,
                editing:false
            });
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearch: (state, action) => {
            const { taskId, inc } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.include = inc;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
            state.include = action.payload;
        },
        toggleEdit:(state, action) => {
            const  taskId = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.editing = !task.editing;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
            state.include = action.payload;
        },
        editTask: (state, action) => {
            const { taskId, newText } = action.payload;
            const task = state.tasks.find((task) => task.id === taskId);
            if (task) {
                task.text = newText;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
    },
});
export const { addTask,toggleEdit,editTask ,toggleTask,setSearch, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;