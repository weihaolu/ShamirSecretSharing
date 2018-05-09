import {randomTrainingInstances, startNearestNeighbor} from "./NearestNeighbor/nearestNeighbor.js";
import React from "react"
function buildTITable(aArray){
        
        var rows = [];
        var row = new Array();
        var table = [];

        for(var i = 0; i<aArray.length; i++){

            for(var p = 0; p<aArray[i].length; p++){
                row[p] = <th key={p}>{aArray[i][p]}</th>;
                                
            }

            rows.push(row);
            row = new Array();      
        }
        
        for(var i = 0; i<rows.length; i++)
        {   
            
            table.push(<tr>{rows[i]}</tr>);
        }

        return <table>{table}</table>;
    }

function buildKnnTable(aArray){
        
        var rows = [];
        var row = new Array();
        var table = [];
        for(var i = 0; i<aArray.length; i++){

            for(var p = 0; p<aArray[i][0].length; p++){
                row[p] = <th key={p}>{aArray[i][0][p]}</th>;
                                
            }
            row[p+1] = <th key={p}>{aArray[i][1]}</th>;
            rows.push(row);
            row = new Array();      
        }
        
        for(var i = 0; i<rows.length; i++)
        {   
            
            table.push(<tr>{rows[i]}</tr>);
        }

        return <table>{table}</table>;
}
export function createKnnDivs(aArray){
    var nn = startNearestNeighbor(aArray[0],aArray[1],aArray[2],aArray[3],aArray[4],aArray[5]);
        
            var listTrainingInstances = buildTITable(nn[0]);
            var listNearestNeigbors= buildKnnTable(nn[1])
            var listPrediction = [];
            listPrediction.push([aArray[2],aArray[3],aArray[4],aArray[5],nn[2]]);

            var lDivs = [<div>Trainingsinstanzen{listTrainingInstances}</div>,<div>k-Nächste Nachbarn{listNearestNeigbors}</div>,<div>Vorhersage{buildTITable(listPrediction)}</div>]
               
            return lDivs;
}