import React from 'react';
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from './todoListReducer';

export type removeTaskType = {
    type: 'REMOVE-TASK',
    id: string,
    todoId: string
}
export type addTaskType = {
    type: 'ADD-TASK',
    title: string,
    todoId: string
}
export type changeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    isDone: boolean,
    todoId: string
}
export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    title: string,
    todoId: string
}


type ActionType = removeTaskType
    | addTaskType
    | changeTaskStatusType
    | changeTaskTitleType
    | AddTodoListAT
    | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .filter(task => task.id !== action.id)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoId]: [newTask, ...state[action.todoId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(task => task.id === action.id
                        ? {...task, isDone: action.isDone}
                        : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(task => task.id === action.id
                        ? {...task, title: action.title}
                        : task)
            }
        }
        case "ADD-TODOLIST": {
            let newTodoId = action.todoId
            return {...state, [newTodoId]: []}
        }
        case "REMOVE-TODOLIST": {
            let newTodo = {...state}
            delete newTodo[action.id]
            return newTodo
        }
        default:
            throw new Error('I do not understand')

    }
};

export const removeTaskAC = (id: string, todoId: string): removeTaskType => {
    return {type: 'REMOVE-TASK', id, todoId}
}
export const addTaskAC = (title: string, todoId: string): addTaskType => {
    return {type: 'ADD-TASK', title, todoId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todoId: string): changeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todoId}
}
export const changeTaskTitleAC = (id: string, title: string, todoId: string): changeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", id, title, todoId}
}



