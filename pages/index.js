import React from 'react';
var ReactDom = require('react-dom');
import Sidebar from 'react-sidebar';
import '../style/style.css';
import {bubblesort} from '../functionality/Bubblesort/bubblesort.js';
import Reactable from 'reactable';
import {randomArray} from '../functionality/Randomgenerator/randomGenerator.js';
import {mergeSort2, convertArray, convertLinkedList} from "../functionality/MergeSort/mergesort.js";
import {quicksort} from "../functionality/Quicksort/quicksort.js";
import {randomTrainingInstances, startNearestNeighbor} from "../functionality/NearestNeighbor/nearestNeighbor.js";
import Reducer from "../store/reducers.js";
import C from "../store/constants.js";
import initialState from "../store/initialState.json";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {connect} from "react-redux";
import * as Action from "../store/actions.js";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "../sagas/saga.js"


const sagaMiddleWare = createSagaMiddleWare();

function configureStore(aInitialState) {

    const store = createStore(Reducer, aInitialState, applyMiddleware(sagaMiddleWare));
    sagaMiddleWare.run(rootSaga);

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept("../store/reducers.js", () => {
            const nextRootReducer = require("../store/reducers.js");
            store.replaceReducer(nextRootReducer);
        });
    }

  return store;
}

var store = configureStore(initialState);
console.log(store.getState());
class Startseite extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            menu: "",
            position:"absolute"
        }
    }

    onUpdate(val){
        this.setState({
            menu: val,
            position: (this.state.menu !== val)?"absolute" : this.state.position
        })
    };
    
    onUpdate2(){
        this.setState({
            position:'relative'
        })
    }
    render() {
        
        return(
            <Provider store ={store}>
            <div>
                <div id ="header">
                    <div className="logo">
                        <a href="#">{this.props.text}</a>
                    </div>
                </div>
                <div id="container" style ={{position: this.state.position}}>
                    <ReactSidebar onUpdate={this.onUpdate.bind(this)}/>{/* define the onUpdate function of ReactSidebar as the onUpdate function of Startseite, so that this function updates the parent state "menu"*/}
                    <div id="content"><Algo onUpdate={this.onUpdate2.bind(this)} passedVal={this.state.menu}/></div>
                </div>
            </div>
            </Provider>
           
        )
    }
};




export class ReactSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
    }

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    update(e){
    
        this.props.onUpdate(e.target.value);
    }

    render() {
        
        var sidebarContent = <b>Sidebar content</b>;
        var lStyles = {
        root: {
            position: 'absolute',
            width: '250px',
            background: '#222222',
            color: '#ffffff',
            height: 'auto',
            minHeight: '100'
            
        },
        content: {
            position: 'absolute',
            overflow: 'auto',
            height: 'auto',
            minHeight: '100%',
            
        },
        dragHandle: {

            display: 'none'
        },
        
    
    }

    return (
        <div id="nav">
            <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}
               styles = {lStyles}
               shadow = {true} >
               
            <ul>
            <li><button onClick={this.update.bind(this)} value='0'>Sortieralgorithmen</button></li>
            <li><button onClick={this.update.bind(this)} value='1'>Nearest Neighbor</button></li>
            </ul>
        </Sidebar>
        </div>
    );
    
  }
  
};

class MYSidebar extends React.Component {

    update(e){
    
        this.props.onUpdate(e.target.value);
        this.setState({menu: e.target.value});
    }

    render() {
    return (
        <div className="sidebar">
            <ul id="nav">
                <li><button onClick={this.update.bind(this)} value='0'>Sortieralgorithmen</button></li>
                <li><button onClick={this.update.bind(this)} value='1'>Nearest Neighbor</button></li>
            </ul>
        </div>
    );
  }

};

class Algo extends React.Component {

    render(){
        
        if((this.props.passedVal)==="0"){
            return(
                <Sortalgorithms onUpdate={this.props.onUpdate.bind(this)} />
            )   
        }
        else if (this.props.passedVal === "1"){
            return(
                <WrappedKnnContainer onUpdate={this.props.onUpdate.bind(this)}/>
            ) 
        }
        else{
            return(
                null
            )
        }
    }
}

var uniqueKey = 0;

class Sortalgorithms extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            _NumberOfValues: '',
            _MaxValue: '',
            _UnsortedArray: '',
            _SortedArray:'',
            _SortAlgo:"",
            _BSPerformance: "",
            _QSPerformance: "",
            _MSPerformance: ""

        };

        
    }

    

    buildTable(aArray){
        
        var rows = [];
        var row = new Array();
        var table = [];

        for(var i = 0; i<aArray.length; i++){

            if((i+1)%20===0){
                row[(i%20)] = <th key={i}>{aArray[i]}</th>;
                rows.push(row);
                row = new Array();

            }
            else{
                row[(i%20)] = <th key={i}>{aArray[i]}</th>;
                if(i===aArray.length-1){
                    rows.push(row);
                }
            }        
        }
        
        for(var i = 0; i<rows.length; i++)
        {   
            
            table.push(<tr>{rows[i]}</tr>);
        }

        return <table>{table}</table>;
    }
    
    userInput(){

        return (
            <div className="row">
                <div className="co-100">
                <form>
                <select id ="sortAlgorithms" onChange={evt => this.updateSortAlg(evt)} >
                    <option disabled selected value> -- Wählen Sie einen Algorithmus -- </option>
                    <option value = "0">Bubblesort</option>
                    <option value = "1">Quicksort</option>
                    <option value = "2">Mergesort</option>
                    <option value = "3">Alle</option>
                 </select>
                </form>
            <div className="row"><div className="col">Anzahl der Werte: </div><div className="col"><input value={this.state._NumberOfValues} onChange={evt => this.updateNumberOfValues(evt)}/></div></div>
            <div className="row"><div className="col">Maximaler Wert: </div><div className="col"><input value={this.state._MaxValue} onChange={evt => this.updateMaxValue(evt)}/></div></div>
            <div className = "row"><div className="col"><button className="submit" onClick={() => this.SubmitAndUpdate()}>Sortieren</button></div></div>
            </div>
            </div>

        )
    }

    updateSortAlg(aEvt){
        this.setState({
            _SortAlgo: aEvt.target.value
        })
    }

    updateNumberOfValues(aEvt){

         this.setState({
            _NumberOfValues:  aEvt.target.value
         }) 
    
    }

    updateMaxValue(aEvt){

         this.setState({
            _MaxValue:  aEvt.target.value
         }) 
    
    }
    SubmitAndUpdate(){

        this.Submit();
        this.update();
    }
    Submit(){
        
        
        var lArray = randomArray(this.state._MaxValue   ,this.state._NumberOfValues);
   
        var listArrayU = this.buildTable(lArray); {/*turning Array into Html Table*/}
        var listArrayS;
        

        switch(this.state._SortAlgo){

            case '0':   var lIt = [0];
                        bubblesort(lArray,lIt);
                        listArrayS = this.buildTable(lArray);
                        break;
            case '1':   var lIt = [0];
                        var lResultArray = quicksort(lArray,lIt);
                        listArrayS = this.buildTable(lResultArray);
                        break;
            case '2':   var lIt = [0];
                        var lLinkedListArray = convertArray(lArray);
                        listArrayS = this.buildTable(convertLinkedList(mergeSort2(lLinkedListArray,lIt)));
                        break;
            case '3':   var bIt=[0], qIt=[0], mIt=[0];
                        
                        var startq = performance.now();
                        var lResultArray = quicksort(lArray,qIt);
                        listArrayS = this.buildTable(lResultArray);
                        var endq = performance.now();

                        var startm = performance.now();
                        var lLinkedListArray = convertArray(lArray);
                        listArrayS = this.buildTable(convertLinkedList(mergeSort2(lLinkedListArray,mIt)));
                        var endm = performance.now();

                        var startb = performance.now();
                        bubblesort(lArray,bIt);
                        var endb = performance.now();

                        this.setState({
                            _BSPerformance: <tr><th>Bubblesort: </th><th><table><tr><th>Ausgeführte Schritte: </th><th> {bIt[0]} </th></tr><tr><th>Benötigte Zeit: </th><th>{ (endb-startb) }</th></tr></table></th></tr>,
                            _QSPerformance: <tr><th>Quicksort: </th><th><table><tr><th>Ausgeführte Schritte: </th><th> {qIt[0]} </th></tr><tr><th>Benötigte Zeit: </th><th>{ (endq-startq) }</th></tr></table></th></tr>,
                            _MSPerformance: <tr><th>Mergesort: </th><th><table><tr><th>Ausgeführte Schritte: </th><th> {mIt[0]} </th></tr><tr><th>Benötigte Zeit: </th><th>{ (endm-startm) }</th></tr></table></th></tr>
                        })
                        break;
        }           
        
        this.setState({
            _UnsortedArray: listArrayU,
            _SortedArray: listArrayS
        })
    }

    update(){
        this.props.onUpdate();
    }

    render(){

        return(
            <div className="col-100">
                <div className="row"><div className ="col-100">{this.userInput()}</div></div>
                <div className="row"><div className="sortTable">{this.state._UnsortedArray}</div></div>
                <div className="row"><div className = "sortTable">{this.state._SortedArray}</div></div>
            <div className="row"><div className="sortTable"><table>{this.state._BSPerformance}{this.state._QSPerformance}{this.state._MSPerformance}</table></div></div>
            </div>
        )
    }
}

class Knn extends React.Component{

    constructor(props){
        super(props)

    }
    
    userInput(){
       
        return (
            <div>
            <div id="testinstance">
                <form>
                    <table id="testinstancetable">
                        <tr>
                            <th id="ageinput"><label>Alter:</label><input type="text" id="age" size="2" onChange={evt => this.updateAge(evt)}/></th>
                            <th><label>Geschlecht:</label><select id="sex" onChange={evt => this.updateSex(evt)}>
                                <option value ="männlich">männlich</option>
                                <option value ="weiblich">weiblich</option>
                            </select></th>
                            <th><label>Familienstand:</label><select id="martialstatus" onChange={evt => this.updateMartialStatus(evt)}>
                                <option value ="ledig"> ledig</option>
                                <option value ="verheiratet">verheiratet</option>
                                <option value ="geschieden">geschieden</option>
                            </select></th>
                            <th><label>Einkommen:</label><select id="salary" onChange={evt => this.updateSalary(evt)}>
                                <option value ="30Tsd-50Tsd">30Tsd-50Tsd</option>
                                <option value ="50Tsd-70Tsd">50Tsd-70Tsd</option>
                                <option value ="70Tsd-90Tsd">70Tsd-90Tsd</option>
                                <option value =">90Tsd">>90Tsd</option>
                            </select></th>
                        </tr>
                    </table>                         
                </form>
            </div>
            <div id="values">
                <table>
                    <tr>
                        <th>Anzahl der Trainingsinstanzen:</th><th><input type="text" id="numberoftrainingsdata" size="2" onChange={evt => this.updateNumberOfInstances(evt)}/></th>
                    </tr>
                    <tr>
                        <th>k:</th><th><input type="text" id="k" size="2" onChange={evt => this.updateK(evt)}/></th>   
                    </tr>
                </table>
            </div>
            <button className="submit" onClick={()=>this.SubmitAndUpdate()}> Start!
            </button>
            </div>
        )
    }

        updateButtonState(){
            var lCondition = this.props.age !=="" && this.props.k !=="" && this.props.numberOfInstances!=="";
            (lCondition)?this.props.setCheckButton(true): this.props.setCheckButton(false);
        }
        updateNumberOfInstances(aEvt){
            this.props.setNumberOfInstances(aEvt.target.value);
        }

        updateK(aEvt){

            this.props.setK(aEvt.target.value);
              
        }

        updateAge(aEvt){
            var AgeAsNumber= parseInt(aEvt.target.value);
            this.props.setAge(AgeAsNumber);
        }

        updateSex(aEvt){

           
            this.props.setSex(aEvt.target.value);
            
        }

        updateMartialStatus(aEvt){

  
           this.props.setMartialStatus(aEvt.target.value);
            
        }

        updateSalary(aEvt){

           
            this.props.setSalary(aEvt.target.value);
            
        }
    
    SubmitAndUpdate(){
        this.updateButtonState();
        this.update();
    }

    update(){
        this.props.onUpdate();
    }


    render(){
        
        return(<div>
            <div className="row"><div className="col-100">{this.userInput()}</div></div>
            <div className="row"><div className="col-100">{this.props.trainingInstancesDiv}</div></div>
            <div className="row"><div className="col-100">{this.props.nearestNeighborsDiv}</div></div>
            <div>{this.props.predictionDiv}</div>
            </div>)
    }
}


function mapStateToProps(state){

    return {
        buttonState: state.buttonState,
        trainingInstancesDiv: state.trainingInstancesDiv,
        nearestNeighborsDiv: state.nearestNeighborsDiv,
        predictionDiv: state.predictionDiv,
        age: state.age,
        sex: state.sex,
        martialStatus: state.martialStatus,
        salary: state.salary,
        numberOfInstances: state.numberOfInstances,
        k: state.k
    }
}

function mapDispatchToProps(dispatch){

    return{
        setCheckButton(aBool){
            dispatch(
                Action.setButton(aBool)
            )
        },
        setAge(aAge){
            dispatch(
                Action.setAge(aAge)
            )
        },

        setMartialStatus(aMS){
            dispatch(
                Action.setMartialStatus(aMS)
            )
        },

        setSex(aSex){
            dispatch(
                Action.setSex(aSex)
            )
        },

        setSalary(aSalary){
            dispatch(
                Action.setSalary(aSalary)
            )
        },

        setNumberOfInstances(aNOF){
            dispatch(
                Action.setNumberOfInstances(aNOF)
            )
        },

        setK(aK){
            dispatch(
                Action.setK(aK)
            )
        }
    }
}
const WrappedKnnContainer = connect(mapStateToProps,mapDispatchToProps)(Knn)

ReactDom.render(<div><Startseite text ="ReactTest" /></div>, document.getElementById('root'));