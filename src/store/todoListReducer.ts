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

export const todoListReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
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

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todoId: v1()
    }
}
export const ChangeTodoListsFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListsFilterAT => {
    return {
        type: "CHANGE-TODO-FILTER",
        id: id,
        filter: filter
    }
}
export const ChangeTodoListsTitleAC = (id: string, title: string): ChangeTodoListsTitleAT => {
    return {
        type: "CHANGE-TODO-TITLE",
        id: id,
        title: title
    }
}