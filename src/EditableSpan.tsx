import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                value={title}
                onBlur={offEditMode}
                autoFocus
                onChange={onChangeHandler}
            />
            // ? <input
            //     value={title}
            //     onBlur={offEditMode}
            //     autoFocus
            //     onChange={onChangeHandler}
            // />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;