import {combineReducers} from "redux";
import {DispatchObj} from "../../Interfaces/interfaces";
import {PickleTypes} from "../types";



function DataReducer(state = [], action: DispatchObj) {
    if (action.type === PickleTypes.fetchData) {
        return action.payload
    }

    return state
}



export default combineReducers({
    DataReducer,

})