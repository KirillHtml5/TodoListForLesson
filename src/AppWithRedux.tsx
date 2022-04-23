import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListsFilterAC,
    changeTodoListsTitleAC,
    removeTodoListAC,

} from "./store/todoListReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    //BLL:

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    // Tasks:
    function removeTask(id: string, todolistId: string) {

        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }

    function addTask(title: string, todolistId: string) {

        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {

        const action = changeTaskTitleAC(id, title, todolistId);
        dispatch(action);
    }

    // Todolists:
    function changeFilter(value: FilterValuesType, todolistId: string) {

        const action = changeTodoListsFilterAC(todolistId, value);
        dispatch(action)
    }

    function removeTodolist(id: string) {

        const action = removeTodoListAC(id);
        dispatch(action);

    }

    function addNewTodolist(newTodolistTitle: string) {

        const action = addTodoListAC(newTodolistTitle);
        dispatch(action);

    }

    function changeTodolistTitle(title: string, todolistId: string) {

        const action = changeTodoListsTitleAC(todolistId, title);
        dispatch(action);
    }

//UI
    const todolistsComponents = todolists.map(tl => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={10}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}

                    />
                </Paper>
            </Grid>

        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addNewTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolistsComponents}
                </Grid>

            </Container>


        </div>
    )
}

export default AppWithRedux;
