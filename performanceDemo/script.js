(function (){
	
	/***********************************
	 ******* Performance Test **********
	 ***********************************/
	const Observable = Rx.Observable;
	
	const testButtonClick$ = Observable.fromEvent(document.querySelector('#testButton'), 'click');
	
	const nonRxJsTransformation = (arr, span) =>{
		const time = new Date().getTime();
		
		arr
		.filter(v => v !== null)
		.map(v => v * 10);
		span.innerHTML = new Date().getTime() - time;
	};
	
	const rxJsTransformation = (arr, span) =>{
		const time = new Date().getTime();
		
		const arr$ =
			Observable.from(arr)
			.filter(v => v !== null)
			.map(v => v * 10);
		
		arr$.subscribe({ complete: () => span.innerHTML = new Date().getTime() - time });
	};
	
	const performanceTest = arrSize =>{
		const myBigArr = [];
		
		for(let i = 0; i < arrSize; i++){
			myBigArr.push(i);
		}
		
		nonRxJsTransformation(myBigArr, document.querySelector('#nonRxSpan'));
		rxJsTransformation(myBigArr, document.querySelector('#rxSpan'));
	};
	
	testButtonClick$
	.map(e => document.querySelector('#arraySizeInput').value)
	.subscribe(arrSize => performanceTest(arrSize));
	
})();