import {Dispatch} from "redux";
import {DispatchObj} from "../../Interfaces/interfaces";
import axios from "axios";
import {PickleTypes} from "../types";


export const FetchCharacters = (page: number) => async (dispatch: Dispatch<DispatchObj>) => {

    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
    console.log(response)
    dispatch({type: PickleTypes.fetchCharacters, payload: response.data})

}
