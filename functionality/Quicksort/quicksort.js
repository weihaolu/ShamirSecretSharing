
function quicksortsplit(aArray, aIt){

    var lLeftSplit =[];
    var lRightplit = [];
    var lPivotIndex = Math.floor(Math.random()*aArray.length);

    for(var i = 0; i<aArray.length; i++){
        
        aIt[0] = aIt[0] +1;

        if(aArray[i]<aArray[lPivotIndex] && i !== lPivotIndex){

            lLeftSplit.push(aArray[i]);
        }
        else if(i !== lPivotIndex){

            lRightplit.push(aArray[i]);
         }
    }

    aIt[0] = aIt[0] +1;

    if(lLeftSplit.length<lRightplit.length){

        lLeftSplit.push(aArray[lPivotIndex]);
    }
    else{

        lRightplit.push(aArray[lPivotIndex]);
    }

    return [lLeftSplit, lRightplit];

}

export function quicksort(aArray, aIt){

    
    if(aArray.length<2){
        
        return aArray;    
    }
   
    var lSplits = quicksortsplit(aArray, aIt);

    var lMerged = quicksort(lSplits[0],aIt).concat(quicksort(lSplits[1],aIt));
    
    
    return lMerged;

}