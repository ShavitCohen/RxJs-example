(function () {

  /*******************************************************
   ******* Scan example - RxJs reduce **********
   *******************************************************/
  const { interval } = rxjs;
  const { skip, take, scan } = rxjs.operators;

  const source$ = interval(1000);
  const input$ = source$
    .pipe(
      skip(1), // ignore zero index, since it fucks up calculation
      take(5),
    );

  const factorial$ = input$
    .pipe(
      scan((acc, curr) => acc * curr, 1),
    );

  const niceFactorial$ = input$.pipe(
    // scan - seed is [1,1] and the acc is the prev calculated value * current.
    // for printout purposes, index is also returned (we have to inc it
    // because even when ignoring the first value, the passed index is still 0 based.
    scan((acc, curr, index) => {
      return { factorial: acc.factorial * curr, idx: index + 1 };
    }, { factorial: 1, idx: 1 }),
  );

  const observer = (val => console.log(val));
  factorial$.subscribe(observer);

  const niceObserver = (val => console.log(`Factorial for ${val.idx} equals ${val.factorial}`));
  niceFactorial$.subscribe(niceObserver);

})();