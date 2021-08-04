import {Dispatch} from "redux";
import {DispatchObj} from "../../Interfaces/interfaces";
import axios from "axios";
import {PickleTypes} from "../types";


export const FetchData = (caller: string, page: number) => async (dispatch: Dispatch<DispatchObj>) => {

    const response = await axios.get(`https://rickandmortyapi.com/api/${caller}?page=${page}`)
    dispatch({type: PickleTypes.fetchData, payload: response.data})

}

export const AddTodo = (editValues: string) => async (dispatch: Dispatch<DispatchObj>) => {
    const response = await axios.patch(`http://localhost:3001/storage/`, {todos: editValues})
    dispatch({type: PickleTypes.AddTodo, payload: response.data})
}



