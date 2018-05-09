export function randomArray(aMaxValue, aNumberOfValues){

    var lResult = [];

    for(var i = 0; i<aNumberOfValues; i++){
        
        lResult.push(Math.floor(Math.random()*(aMaxValue)+1));
        
    }

    return lResult;
}
