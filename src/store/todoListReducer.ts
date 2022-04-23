import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoId: string
}
type ChangeTodoListsFilterAT = {
    type: "CHANGE-TODO-FILTER"
    id: string
    filter: FilterValuesType
}
type ChangeTodoListsTitleAT = {
    type: "CHANGE-TODO-TITLE"
    id: string
    title: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListsFilterAT | ChangeTodoListsTitleAT

const initialState: Array<TodolistType> = [];

export const todoListReducer = (todolists: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" :
            return todolists.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            const newTodolistId = action.todoId
            return [...todolists, {id: newTodolistId, title: action.title, filter: "all"}]
        case "CHANGE-TODO-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODO-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todoId: v1()
    }
}
export const changeTodoListsFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListsFilterAT => {
    return {
        type: "CHANGE-TODO-FILTER",
        id: id,
        filter: filter
    }
}
export const changeTodoListsTitleAC = (id: string, title: string): ChangeTodoListsTitleAT => {
    return {
        type: "CHANGE-TODO-TITLE",
        id: id,
        title: title
    }
}