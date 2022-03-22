import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {
    ActionType,
    AddTodoListAC,
    ChangeTodoListsFilterAC,
    ChangeTodoListsTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./todoListReducer";


test('correct todolist should be removed', () => {

    let todolistId1: string = v1();
    let todolistId2: string = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    // const action: ActionType = {
    //     type: "REMOVE-TODOLIST",
    //     id: todolistId1
    // }
    const endState = todoListReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    // const action: ActionType = {
    //     type: "ADD-TODOLIST",
    //     title: newTodolistTitle
    // }
    const endState = todoListReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ActionType = {
    //     type: "CHANGE-TODO-FILTER",
    //     filter: newFilter,
    //     id: todolistId2
    // }
    const endState = todoListReducer(startState, ChangeTodoListsFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {
    let todolistId1: string = v1();
    let todolistId2: string = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ActionType = {
    //     type: "CHANGE-TODO-TITLE",
    //     title: newTodolistTitle,
    //     id: todolistId2
    // }
    const endState = todoListReducer(startState, ChangeTodoListsTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
