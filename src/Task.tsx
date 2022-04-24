import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {HighlightOff} from "@material-ui/icons";
import {TaskType} from "./Todolist";


type TaskPropsType = {
    tasks: TaskType;
    removeTask: (taskId: string) => void;
    changeTaskStatus: (id: string, isDone: boolean) => void;
    changeTaskTitle: (id: string, title: string) => void;
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.tasks.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.tasks.id, newIsDoneValue,);
    }
    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.tasks.id, title)
    }
    return (
        <ListItem className={props.tasks.isDone ? "is-done" : ""}
                  style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid green'
                  }}
        >
            <Checkbox color={'primary'} onChange={onChangeHandler} checked={props.tasks.isDone}/>
            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
            <EditableSpan title={props.tasks.title} changeTitle={changeTaskTitle}/>
            {/*<span>{t.title}</span>*/}
            {/*<button onClick={onClickHandler}>x</button>*/}
            <IconButton
                size={'small'}
                color={'secondary'}
                onClick={onClickHandler}>
                <HighlightOff fontSize={'small'}/>
            </IconButton>
        </ListItem>

    );
});

