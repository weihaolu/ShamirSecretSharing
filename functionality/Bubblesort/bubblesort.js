/**
 * 
 */

function swap(aArray, aIndex1, aIndex2){
	
	var lTemp = aArray[aIndex1];
	aArray[aIndex1] = aArray[aIndex2];
	aArray[aIndex2] = lTemp;
}

export function bubblesort(aArray, aIt){

	var it = 0;

	for(var i = aArray.length-1; i>0; i--){
		
		for(var p = 0; p<i; p++){
			
			it++;
			if(aArray[p] > aArray[p+1]){
				
				swap(aArray,p,p+1);
				
			}
		}
	}
	aIt[0]=it;
}