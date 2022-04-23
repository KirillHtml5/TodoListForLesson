import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListsFilterAC,
    changeTodoListsTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./store/todoListReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    //BLL:
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, dispatchToTodolist] = useReducer(todoListReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    });

    // Tasks:
    function removeTask(id: string, todolistId: string) {

        const action = removeTaskAC(id, todolistId);
        dispatchToTasks(action);
    }

    function addTask(title: string, todolistId: string) {

        const action = addTaskAC(title, todolistId);
        dispatchToTasks(action);
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatchToTasks(action);
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {

        const action = changeTaskTitleAC(id, title, todolistId);
        dispatchToTasks(action);
    }

    // Todolists:
    function changeFilter(value: FilterValuesType, todolistId: string) {

        const action = changeTodoListsFilterAC(todolistId, value);
        dispatchToTodolist(action)
    }

    function removeTodolist(id: string) {

        const action = removeTodoListAC(id);
        dispatchToTodolist(action);
        dispatchToTasks(action);
    }

    function addNewTodolist(newTodolistTitle: string) {

        const action = addTodoListAC(newTodolistTitle);
        dispatchToTodolist(action);
        dispatchToTasks(action);
    }

    function changeTodolistTitle(title: string, todolistId: string) {

        const action = changeTodoListsTitleAC(todolistId, title);
        dispatchToTodolist(action);
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

export default AppWithReducers;
