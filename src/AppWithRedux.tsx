import React, {useCallback} from 'react';
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
    const removeTask = useCallback((id: string, todolistId: string) => {

        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {

        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {

        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {

        const action = changeTaskTitleAC(id, title, todolistId);
        dispatch(action);
    }, [dispatch]);

    // Todolists:
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {

        const action = changeTodoListsFilterAC(todolistId, value);
        dispatch(action)
    }, [dispatch]);

    const removeTodolist = useCallback((id: string) => {

        const action = removeTodoListAC(id);
        dispatch(action);

    }, [dispatch]);

    const addNewTodolist = useCallback((newTodolistTitle: string) => {

        const action = addTodoListAC(newTodolistTitle);
        dispatch(action);

    }, [dispatch]);

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {

        const action = changeTodoListsTitleAC(todolistId, title);
        dispatch(action);
    }, [dispatch]);

//UI
    const todolistsComponents = todolists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={10}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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
