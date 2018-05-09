/**
 * 
 */

function LinkedList(){
	
	this.head = null;
};

LinkedList.prototype.isEmpty = function(){
	
	return this.head === null;
};

LinkedList.prototype.append = function(val){
	
	var newNode = {
			
		data: val,
		next: null,
		};
	
	if(this.isEmpty()){
		
		this.head = newNode;
		return;
	}
	
		var current = this.head;
		
		while(current.next !== null){
			
			current = current.next;
		}
		
		current.next = newNode;
	
};

LinkedList.prototype.removeFirst = function(){

	if(this.head.next !== null){
		this.head = this.head.next;
	}
	else{
		this.head.data = null;
	}

}

LinkedList.prototype.toString = function(){

	var lResult = "";
	var current = this.head;
	if(current.data !== null){

		lResult = lResult + current.data + ",";

	}
	while(current.next !== null){

		current = current.next;
		lResult = lResult + current.data+",";		
	}

	return lResult;
}

LinkedList.prototype.getSize = function(){

	var counter = 0;
	var current = this.head;

	if(current.data !== null){

		counter++;
	}
	while(current.next !== null){

		counter++;
		current = current.next;
	}

	return counter;
}

LinkedList.prototype.split = function(){

	var lTemp = this.head;

	for(var i = 0; i<(this.getSize()/2)-1; i++){

		lTemp = lTemp.next;
	}
		
	var lRightL = new LinkedList();
	lRightL.head = lTemp.next;
	lTemp.next = null;

	return lRightL;
}

function merge(aLeftList, aRightList, aIt){
	
	var lResult = new LinkedList();
	
	while(aLeftList.getSize() > 0 && aRightList.getSize()>0){
		
		aIt[0] = aIt[0]+1;

		if(aLeftList.head.data < aRightList.head.data){

			lResult.append(aLeftList.head.data);
			aLeftList.removeFirst();
		}
		else{
			
			lResult.append(aRightList.head.data);
			aRightList.removeFirst();
			
		}
	}
	
	while (aLeftList.getSize()>0){

		aIt[0] = aIt[0]+1;
		lResult.append(aLeftList.head.data);
		aLeftList.removeFirst();
	}
	
	while (aRightList.getSize()>0){

		aIt[0] = aIt[0]+1;
		lResult.append(aRightList.head.data);
		aRightList.removeFirst();
	}

	return lResult;
};

function mergeSort(aLinkedList){

	var lLeft;
	var lRight;
	var lSize = aLinkedList.getSize();
	if(aLinkedList.getSize()>1){
		var lRSplit = aLinkedList.split();
		lLeft = mergeSort(aLinkedList);
		
		lRight = mergeSort(lRSplit);			
	}

	return (lSize==1)? aLinkedList : merge(lLeft,lRight);
};

export function mergeSort2(aLinkedList,aIt){
	
	if(aLinkedList.getSize()<2){

		return aLinkedList;
	}

	var lRight = aLinkedList.split();

	return merge(mergeSort2(aLinkedList,aIt), mergeSort2(lRight,aIt),aIt);
};

export function convertArray(aArray){

	var lResult = new LinkedList();

	for(var i=0; i<aArray.length; i++){
		
		lResult.append(aArray[i]);
	}

	return lResult;
}

export function convertLinkedList(aLinkedList){

	var lResult = [];

	var lCurrent = aLinkedList.head;
	while(lCurrent.next != null){

		lResult.push(lCurrent.data);
		lCurrent = lCurrent.next;
	}

	lResult.push(lCurrent.data);
	
	return lResult;
}