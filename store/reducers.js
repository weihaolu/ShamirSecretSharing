import C from "./constants.js"
import {combineReducers} from "redux";

const buttonState = (state="",action) => {
    return (action.type === C.SET_BUTTON)? action.payload: state; 
}

const trainingInstancesDiv = (state="",action) => {
    return (action.type === C.SET_TIDIV)? action.payload : state; 
}

const nearestNeighborsDiv = (state="",action) => {
    
    return (action.type === C.SET_NNDIV)? action.payload: state; 
}

const predictionDiv = (state="",action) => {
    
    return (action.type === C.SET_PREDDIV)? action.payload: state; 
}

const age = (state="",action) => {
    
    return (action.type === C.SET_AGE)? parseInt(action.payload): state; 
}

const sex = (state="männlich",action) => {

    return (action.type === C.SET_SEX)? action.payload: state; 
}

const martialStatus = (state="ledig",action) => {

    return (action.type === C.SET_MARTIALSTATUS)?action.payload: state; 
}

const salary = (state="30Tsd-50Tsd",action) => {

    return (action.type === C.SET_SALARY)? action.payload : state; 
}

const numberOfInstances = (state="",action) => {

    return (action.type === C.SET_NUMBEROFINSTANCES)? parseInt(action.payload): state; 
}

const k = (state="",action) => {

    return (action.type === C.SET_K)? parseInt(action.payload): state; 
}

const singleReducer = combineReducers({
    buttonState,
    trainingInstancesDiv,
    nearestNeighborsDiv,
    predictionDiv,
    age,
    sex,
    martialStatus,
    salary,
    numberOfInstances,
    k
})

export default singleReducer;