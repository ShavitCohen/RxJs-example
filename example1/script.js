(function () {

  /*******************************************************
   ******* Example 1 - Observable from array **********
   *******************************************************/
  const { from } = rxjs;
  const { map, filter } = rxjs.operators;

  const arr = [10, 30, null, 36, 70];

  const source$ = from(arr);
  const arr$ = source$
    .pipe(
      filter(v => !!v),
      map(v => v * 10),
    );

  const observer = {
    next: val => console.log(val),
    error: err => console.log(err),
    complete: () => console.log('completed'),
  };

  arr$.subscribe(observer);

})();