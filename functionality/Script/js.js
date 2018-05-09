function selectedAlgo(){

    return document.getElementById("sortAlgorithms").value;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function checkSelected(){

    if(document.getElementById("sortAlgorithms") !=null){
        document.getElementById("maxValue").disabled=false;
        document.getElementById("numberOfElements").disabled=false;
    }
}

function getMaxValue(){

    var lResult = parseInt(document.getElementById("maxValue").value);
  
    return lResult;
}

function getNumberOfElements(){

    return parseInt(document.getElementById("numberOfElements").value);
}


function buildArrayString(aArray){

    var lArrayOutput = "<table><tr>";

    for(var i=0; i<aArray.length; i++){

        lArrayOutput+="<th>"+aArray[i]+"</th>";

        if((i+1)%20==0){

            lArrayOutput+="</tr></tr>";
        }
    }
    lArrayOutput+= "</tr></table>"

    return lArrayOutput;
}

function copayArray(aArray,aNewArray){
    alert();
    for(var i = 0; i< aArray.length; i++){
        
        aNewArray[i] = aArray[i];
    }
    
}

function algoMain(){

    var lSelectedAlgo = selectedAlgo();
    var lArray = randomArray(getMaxValue(),getNumberOfElements());

    document.getElementById("unsortedListHeadline").innerHTML ="Das unsortierte Array:"; 
    document.getElementById("unsortedList").innerHTML = buildArrayString(lArray);  
    document.getElementById("sortedListHeadline").innerHTML ="Das sortierte Array:"; 
    
    switch(lSelectedAlgo){

        case"Bubblesort":   var it = [];
                            var start = performance.now();
                            bubblesort(lArray, it);                   
                            var end = performance.now();
                               
                            document.getElementById("sortedList").innerHTML = buildArrayString(lArray);
                            document.getElementById("sortResultHeadline").innerHTML = "Performance:";   
                            document.getElementById("sortResult").innerHTML = "<table><tr><th>Ausgeführte Schritte: </th><th>" + it[0] +"</th></tr><tr><th>Benötigte Zeit: </th><th>" + (end-start) +"</th></tr></table>";
                            
                            break;

        case"Quicksort":    var it = []
                            it[0] = 0;
                            var start = performance.now();
                            var lSortedArray = quicksort(lArray,it);
                            var end = performance.now();
                            
                            document.getElementById("sortedList").innerHTML = buildArrayString(lSortedArray);
                            document.getElementById("sortResultHeadline").innerHTML = "Performance:";   
                            document.getElementById("sortResult").innerHTML = "<table><tr><th>Ausgeführte Schritte: </th><th>" + it[0] +"</th></tr><tr><th>Benötigte Zeit: </th><th>" + (end-start) +"</th></tr></table>";
                            break;

        case"Mergesort":    var it = []
                            it[0] = 0;
                            var lConvertedArray = convertArray(lArray);
                            var start = performance.now();
                            var lSortedList = mergeSort2(lConvertedArray,it);
                            var end = performance.now();
                           
                            document.getElementById("sortedList").innerHTML = buildArrayString(convertLinkedList(lSortedList));
                            document.getElementById("sortResultHeadline").innerHTML = "Performance:";   
                            document.getElementById("sortResult").innerHTML = "<table><tr><th>Ausgeführte Schritte: </th><th>" + it[0] +"</th></tr><tr><th>Benötigte Zeit: </th><th>" + (end-start) +"</th></tr></table>";       
                            break;

        case "Alle":        
                            var itq = [];
                            itq[0] = 0;
                            var startq = performance.now();
                            var lSortedArray = quicksort(lArray,itq);
                            var endq = performance.now();

                            var itm = [];
                            itm[0] = 0;
                            var lConvertedArray = convertArray(lArray);
                            var startm = performance.now();
                            var lSortedList = mergeSort2(lConvertedArray,itm);
                            var endm = performance.now();

                            var itb = [];
                            var startb = performance.now();
                            bubblesort(lArray, itb);                   
                            var endb = performance.now();
                            
                            
                            document.getElementById("sortedList").innerHTML = buildArrayString(lSortedArray);
                             
                            document.getElementById("sortResultHeadline").innerHTML = "Performance:";
                            var lSortResultString = "<table><tr><th>Bubblesort: </th><th><table><tr><th>Ausgeführte Schritte: </th><th>" + itb[0] +"</th></tr><tr><th>Benötigte Zeit: </th><th>" + (endb-startb) +"</th></tr></table></th></tr>";
                                lSortResultString += "<tr><th>Quicksort: </th><th><table><tr><th>Ausgeführte Schritte: </th><th>" + itq[0] +"</th></tr><tr><th>Benötigte Zeit: </th><th>" + (endq-startq) +"</th></tr></table></th></tr>";
                                lSortResultString += "<tr><th>Mergesort: </th><th><table><tr><th>Ausgeführte Schritte: </th><th>" + itm[0] +"</th></tr><tr><th>Benötigte Zeit: </th><th>" + (endm-startm) +"</th></tr></table></th></tr></table>"
                            document.getElementById("sortResult").innerHTML = lSortResultString;       
                            break;
    }                       
    
}

function showResults(){
    
    var lVisibility = document.getElementById("unsortedBox");
  
        lVisibility.style.display ='table';

        lVisibility = document.getElementById("sortedBox");
        
        lVisibility.style.display ='table';

        lVisibility = document.getElementById("sortResultBox");
        
        lVisibility.style.display ='table';

}
$(function(){
    
$(':text').keyup(function() {
    if($('#maxValue').val() != "" && $('#numberOfElements').val() != "") {
       $('#start').removeAttr('disabled');
    } else {
       $('#start').attr('disabled', true);   
    }
});
}
)


