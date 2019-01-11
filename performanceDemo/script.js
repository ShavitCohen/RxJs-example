(function () {

  /***********************************
   ******* Performance Test **********
   ***********************************/
  const { fromEvent, from } = rxjs;
  const { filter, map } = rxjs.operators;

  const testButton = document.querySelector('#testButton');
  const testButtonClick$ = fromEvent(testButton, 'click');

  const nonRxJsProcess = (arr, span) => {
    const time = new Date().getTime();

    arr
      .filter(v => v !== null)
      .map(v => v * 10);

    span.innerHTML = new Date().getTime() - time;
  };

  const rxJsTProcess = (arr, span) => {
    const time = new Date().getTime();

    const source$ = from(arr);
    const stream$ = source$
      .pipe(
        filter(v => v !== null),
        map(v => v * 10),
      );

    stream$.subscribe({ complete: () => span.innerHTML = new Date().getTime() - time });
  };

  const performanceTest = arrSize => {
    const myBigArr = [];

    for (let i = 0; i < arrSize; i++) {
      myBigArr.push(i);
    }

    nonRxJsProcess(myBigArr, document.querySelector('#nonRxSpan'));
    rxJsTProcess(myBigArr, document.querySelector('#rxSpan'));
  };

  testButtonClick$
    .pipe(
      map(() => document.querySelector('#arraySizeInput').value),
    )
    .subscribe(arrSize => performanceTest(arrSize));

})();