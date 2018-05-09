$(function(){
    
$(':text').keyup(function() {
    if($('#age').val() != "" && $('#numberoftrainingsdata').val() != ""&& $('#k').val() != "") {
       $('#start').removeAttr('disabled');
    } else {
       $('#start').attr('disabled', true);   
    }
});
}
)

function buildTrainingsDataString(aArray){

    var lArrayOutput = "<table><tr class=\"headline\"><th>Alter</th><th>Geschlecht</th><th>Familienstand</th><th>Einkommen</th><th>Auto</th></tr>";
    
    for(var i=0; i<aArray.length; i++){
        
        lArrayOutput += "<tr>";
        for(var p=0; p<aArray[i].length;p++){

            lArrayOutput += "<th>"+aArray[i][p];+"</th>"
        }
        lArrayOutput += "</tr>";
    }

    lArrayOutput += "</table>";

    return lArrayOutput;
}

function buildNearestNeighborString(aArray){

    var lArrayOutput = "<table><tr class=\"headline\"><th>Alter</th><th>Geschlecht</th><th>Familienstand</th><th>Einkommen</th><th>Auto</th><th>Distanz</th></tr>";
    
    for(var i=0; i<aArray.length; i++){
        
        lArrayOutput += "<tr>";
        
        for(var p=0; p<(aArray[i][0]).length;p++){

            lArrayOutput += "<th>"+(aArray[i][0])[p];+"</th>"
        }
        lArrayOutput +="<th>"+aArray[i][1]+"</th></tr>";
    }

    lArrayOutput += "</table>";

    return lArrayOutput;
}


function startKnn(){

    var TestInstance = []
    var TrainingsInstances = randomTrainingInstances(document.getElementById("numberoftrainingsdata").value);
    TestInstance.push(parseInt(document.getElementById("age").value));
    TestInstance.push(document.getElementById("sex").value);
    TestInstance.push(document.getElementById("martialstatus").value);
    TestInstance.push(document.getElementById("salary").value);
    
    document.getElementById("tiHeadline").innerHTML = "<h2>Trainingsinstanzen:</h2>";
    document.getElementById("trainingsInstances").innerHTML = buildTrainingsDataString(TrainingsInstances);
    
    var Klassifier = new NearestNeighbor(TrainingsInstances,TestInstance, document.getElementById("k").value);

    var nearestNeighbors = Klassifier.getNearestNeighbors();

    document.getElementById("nnHeadline").innerHTML = "<h2>K-Nächste Nachbarn:</h2>";
    document.getElementById("nearestNeighbors").innerHTML = buildNearestNeighborString(nearestNeighbors);
    document.getElementById("cHeadline").innerHTML = "<h2>Klassifikation:</h2>";
    document.getElementById("classification").innerHTML =  "<table class =\"noborder\"><tr><th class=\"noborder\"><table><tr><th>"+ TestInstance[0] +"</th><th>"+ TestInstance[1] +"</th><th>"+ TestInstance[2] +"</th><th>"+ TestInstance[3] +"</th></tr></table></th><th class=\"implication\"> &rArr; </th><th class=\"implication\">"+ Klassifier.getWinner(nearestNeighbors)+ "</th></tr></table>";
    
}

function showResults(){

    document.getElementById("tiHeadline").style.display = "table";
    document.getElementById("nnHeadline").style.display = "table";
    document.getElementById("cHeadline").style.display = "table";
    document.getElementById("trainingsInstancesBox").style.display = "table";
    document.getElementById("nearestNeighborsBox").style.display = "table";
    document.getElementById("classification").style.display = "table";
}