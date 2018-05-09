
function skiDay (state = null, action){
    return (action.type === "ADD_DAY")? action.payload : state;
}

function allSkiDays (state = [], action){
    switch (action.type){

        case "ADD_DAY": 
        
            return state.push(action.payload); 
            /*you will still get the old state 
            because redux will compare memory locations of the old state with
            the new state you return and if they are the same
            the old state will be returned*/

        case "DELETE_DAY":

        default: 
            return state
    }
}

function allSkiDays (state = [], action){
    switch (action.type){

        case "ADD_DAY": 
        
        return [ //new Array
            ...state, skiDay(null, action) 
        ]
        /*now you will get the new state becaause a new object has been created, 
        so that the memomy locations of the old and new state are different*/

        case "DELETE_DAY":

        default: 
            return state
    }
}

function addSkiDay(aSkiDay){
    return{
        type:"ADD_DAY",
        payload: aSkiDay
    }
}

import C from "./constants.js"

export  function setAge(aAge){
    return{

        type:C.SET_AGE,
        payload: aAge
    }
}

export  function setSex(aSex){
    return{

        type:C.SET_SEX,
        payload: aSex
    }
}

export  function setMartialStatus(aMS){
    return{

        type:C.SET_MARTIALSTATUS,
        payload: aMS
    }
}

export  function setSalary(aSalary){
    return{

        type:C.SET_SALARY,
        payload: aSalary
    }
}

export  function setNumberOfInstances(aNOF){
    return{

        type:C.SET_NUMBEROFINSTANCES,
        payload: aNOF
    }
}

export  function setK(aK){
    return{

        type:C.SET_K,
        payload: aK
    }
}

export function setButton(aB){
    return{
        type:C.SET_BUTTON,
        payload: aB
    }
}

export function setTIDiv(aB){
   
    return{
        type:C.SET_TIDIV,
        payload: aB
    }
}

export function setNNDiv(aB){
    return{
        type:C.SET_NNDIV,
        payload: aB
    }
}

export function setPredictionDiv(aB){
    return{
        type:C.SET_PREDDIV,
        payload: aB
    }
}