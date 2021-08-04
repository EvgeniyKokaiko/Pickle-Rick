import {Dispatch} from "redux";
import {DispatchObj, Todo} from "../../Interfaces/interfaces";
import axios from "axios";
import {PickleTypes} from "../types";


export const FetchData = (caller: string, page: number) => async (dispatch: Dispatch<DispatchObj>) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/${caller}?page=${page}`)
    dispatch({type: PickleTypes.fetchData, payload: response.data})

}

export const AddTodo = (editValues: Todo[]) => async (dispatch: Dispatch<DispatchObj>) => {
    const response = await axios.patch(`http://localhost:3001/storage/`, {todos: editValues})
    dispatch({type: PickleTypes.AddTodo, payload: response.data})
}

export const DeleteTodo = (todos: Todo[], todo: Todo) => async (dispatch: Dispatch<DispatchObj>) => {
    const response = await axios.patch(`http://localhost:3001/storage/`, {todos: todos.filter(el => el !== todo)})
    dispatch({type: PickleTypes.DeleteTodo, payload: response.data})
}



export const GetTodo = () => async (dispatch: Dispatch<DispatchObj>) => {
    const response = await axios.get(`http://localhost:3001/storage/`)
    dispatch({type: PickleTypes.GetTodo, payload: response.data.todos})

}



