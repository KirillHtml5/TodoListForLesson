import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {Backspace} from "@material-ui/icons";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist');
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const addTaskToTodolist = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id)
    }, [props.addTask, props.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.changeTodolistTitle, props.id]);

    let allTodolistTasks = props.tasks;

    if (props.filter === "active") {
        allTodolistTasks = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        allTodolistTasks = props.tasks.filter(t => t.isDone);
    }

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.id)
    }, [props.removeTask, props.id]);

    const changeTaskStatus = useCallback((id: string, isDone: boolean) => {
        props.changeTaskStatus(id, isDone, props.id)
    }, [props.changeTaskStatus, props.id]);

    const changeTaskTitle = useCallback((id: string, title: string) => {
        props.changeTaskTitle(id, title, props.id)
    }, [props.changeTaskTitle, props.id]);


    return <div style={{width: 'fit-content', textAlign: 'center'}}>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton
                color={'secondary'}
                onClick={removeTodolist}>
                <Backspace/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskToTodolist}/>
        <List>

            {
                allTodolistTasks.map(t => {

                    return (
                        <Task
                            key={t.id}
                            tasks={t}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />
                    )
                })
            }
        </List>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                size={'small'} variant={'contained'} disableElevation
                color={props.filter === 'all' ? 'secondary' : 'primary'}
                className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size={'small'} variant={'contained'} disableElevation
                color={props.filter === 'active' ? 'secondary' : 'primary'}
                className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={'small'} variant={'contained'} disableElevation

                color={props.filter === 'completed' ? 'secondary' : 'primary'}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
});


