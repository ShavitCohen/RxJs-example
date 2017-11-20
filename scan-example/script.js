(function (){

    const recursionFactorialize = (num) => {
        if (num < 0)
            return -1;
        else if (num == 0)
            return 1;
        else {
            return (num * recursionFactorialize(num - 1));
        }
    };
    console.log(`Recursion factorial(5): ${recursionFactorialize(5)}`);

    function loopFactorialize(num) {
        if (num === 0 || num === 1)
            return 1;
        for (var i = num - 1; i >= 1; i--) {
            num *= i;
        }
        return num;
    }
    console.log(`Loop factorial(5): ${loopFactorialize(5)}`);

	/*******************************************************
	 ******* Scan example - RxJs reduce **********
	 *******************************************************/
	const Observable = Rx.Observable;

	const input$ =
		Observable.interval(1000)
        	// ignore zero index, since it fucks up calculation
			.skip(1)
			.take(5);

	const factorial$ = input$
        .scan((acc, curr) => acc * curr, 1);

	const niceFactorial$ = input$
			// scan - seed is [1,1] and the acc is the prev calculated value * current.
			// for printout purposes, index is also returned (we have to inc it
			// because even when ignoring the first value, the passed index is still 0 based.
			.scan((acc, curr, index) => {
				return {factorial: acc.factorial * curr, idx: index+1}
			}, {factorial: 1, idx: 1});

    const observer = (val => console.log(val));
    factorial$.subscribe(observer);

    const niceObserver = (val => console.log(`Factorial for ${val.idx} equals ${val.factorial}`));
    niceFactorial$.subscribe(niceObserver);

})();