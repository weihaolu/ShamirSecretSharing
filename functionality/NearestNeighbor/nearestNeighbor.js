export function startNearestNeighbor(aK, aNumerOfInstances, aAge, aSex,aMS,aSalary){
        
        var lTrainingsInstances = randomTrainingInstances(aNumerOfInstances);
        var lTestInstance = [aAge, aSex, aMS, aSalary];
        var lKlassifier = new NearestNeighbor(lTrainingsInstances, lTestInstance, aK);
        var lNearestNeighbors = lKlassifier.getNearestNeighbors();
        var lWinner = lKlassifier.getWinner(lNearestNeighbors);

        return [lTrainingsInstances,lNearestNeighbors,lWinner];


}

function NearestNeighbor(aArrayOfTrainingInstances, aTestInstance, aK){

    this._TrainingInstances = aArrayOfTrainingInstances;
    this._TestInstance = aTestInstance;
    this._k = aK;
}

function randomAge(){

    return Math.floor(Math.random()*80) + 1;
}

function randomSex(){

    var lRandom = Math.floor(Math.random()*2);

    return (lRandom == 0)? "männlich":"weiblich";
}

function randomMartialStatus(){

    var lRandom = Math.floor(Math.random()*(3));

    var lResult ="";

    switch(lRandom){

        case 0: lResult = "ledig";
                break;
        case 1: lResult = "verheiratet";
                break;
        case 2: lResult = "geschieden";
                break;
                
    }

    return lResult;
}

function randomSalary(){

    var lRandom = Math.floor(Math.random()*4);
    var lResult = "";

    switch(lRandom){

        case 0: lResult = "30Tsd-50Tsd";
                break;
        case 1: lResult = "50Tsd-70Tsd";
                break;
        case 2: lResult = "70Tsd-90Tsd";
                break;
        case 3: lResult = ">90Tsd";     
    }

    return lResult;
}
function randomCar(){

    var lRandom = Math.floor(Math.random()*(3));

    var lResult ="";

    switch(lRandom){

        case 0: lResult = "sport";
                break;
        case 1: lResult = "mini";
                break;
        case 2: lResult = "limo";
                break;
                
    }

    return lResult;
}

export function randomTrainingInstances(aNumberOfInstances){

    var lResult = [];

    for(var i=0; i<aNumberOfInstances; i++){
        
        var lRandomInstance = [];
        lRandomInstance.push(randomAge());
        lRandomInstance.push(randomSex());
        lRandomInstance.push(randomMartialStatus());
        lRandomInstance.push(randomSalary());
        lRandomInstance.push(randomCar());
        
        lResult.push(lRandomInstance);
    }

    return lResult;
}

function sortArrayWithTuples(aArray){

    for(var i= aArray.length-1; i>0; i--){

        for(var p=0; p<i;p++){

            if((aArray[p][1])>(aArray[p+1][1])){
                
                var lTemp = aArray[p];
                aArray[p] = aArray[p+1];
                aArray[p+1] = lTemp;
            }
        }
    }
}

NearestNeighbor.prototype.getEuklidDistance=function(aInstance){

    var lResult = 0;
    
    for(var i=0; i<this._TestInstance.length-1; i++){

        if(typeof this._TestInstance[i]=== 'number'){
            
            var lDistance = this._TestInstance[i]-aInstance[i];
            
            lResult += (lDistance*lDistance);   
             
                              
        }
        else{
            if(this._TestInstance[i]!==aInstance[i]){
              
                lResult++; 
            }
            
        }
    }
    
    return Math.sqrt(lResult);
}

NearestNeighbor.prototype.getNearestNeighbors=function(){
    
    var lNearestNeighbors = [];

    var lArrayOfTuples =[];

    
    
    for(var i=0; i<this._TrainingInstances.length; i++){
        var lTuple = [];
        lTuple[0] = this._TrainingInstances[i];
        lTuple[1] = this.getEuklidDistance(this._TrainingInstances[i]);
        lArrayOfTuples.push(lTuple);
        
    }

    

    sortArrayWithTuples(lArrayOfTuples);

    for(var i=0; i<this._k; i++){

        lNearestNeighbors.push(lArrayOfTuples[i]);
    }
   
    return lNearestNeighbors;
}

NearestNeighbor.prototype.getWinner=function(aArrayWithNearestNeighbors){

    var lMap = {}
    var lCurrentWinner ="";
    var lCurrentWinnerVotes = 0;
    
    
    for(var i=0; i<aArrayWithNearestNeighbors.length; i++){
        
        var lLabel = (aArrayWithNearestNeighbors[i][0])[4];
        var lDistance = aArrayWithNearestNeighbors[i][1];
        
        if(lDistance==0){

            return lLabel;
        }
        else{

            if(lMap[lLabel] == null){
                
                lMap[lLabel] = 1/lDistance;
                
            }
            else{

                lMap[lLabel] += 1/lDistance;
            }

                if(lCurrentWinnerVotes<lMap[lLabel]){

                    lCurrentWinner = lLabel;
                    lCurrentWinnerVotes = lMap[lLabel];
                }
        }
    }

    return lCurrentWinner;
}