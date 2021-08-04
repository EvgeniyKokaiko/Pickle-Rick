import {combineReducers} from "redux";
import {DispatchObj} from "../../Interfaces/interfaces";
import {PickleTypes} from "../types";



function DataReducer(state = [], action: DispatchObj) {
    if (action.type === PickleTypes.fetchData) {
        return action.payload
    }

    return state
}


function TodosReducer(state = [], action: DispatchObj) {
    if (action.type === PickleTypes.AddTodo) {
    } else if (action.type === PickleTypes.GetTodo) {
        return action.payload
    } else if (action.type === PickleTypes.DeleteTodo) {
    }

    return state
}



export default combineReducers({
    DataReducer,
    TodosReducer
})