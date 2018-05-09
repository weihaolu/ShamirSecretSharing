import{takeEvery} from "redux-saga";
import{ fork, call, put, select} from "redux-saga/effects";
import * as Actions from "../store/actions.js";
import {createKnnDivs} from "../functionality/main.js";
import C from "../store/constants.js"



function* getKnnDIVs(){
    
    var state = yield select();
    if(state.buttonState === true){

    var lDivs = yield call(createKnnDivs, [state.k,state.numberOfInstances,state.age,state.sex,state.martialStatus,state.salary]);
    yield put(Actions.setTIDiv(lDivs[0]));
    yield put(Actions.setNNDiv(lDivs[1]) );
    yield put(Actions.setPredictionDiv(lDivs[2]));
    }

}

function* checkButtonClick (){
   yield takeEvery(C.SET_BUTTON, getKnnDIVs);
   
}


export default function* rootSaga(){

    yield checkButtonClick();

}