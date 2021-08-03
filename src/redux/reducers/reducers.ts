import {combineReducers} from "redux";
import {DispatchObj} from "../../Interfaces/interfaces";
import {PickleTypes} from "../types";



function CharactersReducer(state = [], action: DispatchObj) {
    if (action.type === PickleTypes.fetchCharacters) {
        return action.payload
    }

    return state
}



export default combineReducers({
    CharactersReducer,

})