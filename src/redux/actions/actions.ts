import {Dispatch} from "redux";
import {DispatchObj} from "../../Interfaces/interfaces";
import axios from "axios";
import {PickleTypes} from "../types";


export const FetchData = (caller: string, page: number) => async (dispatch: Dispatch<DispatchObj>) => {

    const response = await axios.get(`https://rickandmortyapi.com/api/${caller}?page=${page}`)
    dispatch({type: PickleTypes.fetchData, payload: response.data})

}

