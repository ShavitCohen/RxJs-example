(function () {

  /*******************************************************
   ******* Example 1 - Observable from array **********
   *******************************************************/
  const Observable = Rx.Observable;
  const arr = [10, 30, null, 36, 70];

  const arr$ =
    Observable.from(arr)
      .filter(v => !!v)
      .map(v => v * 10);

  const observer = {
    next: val => console.log(val),
    error: err => console.log(err),
    complete: () => console.log('completed'),
  };

  arr$.subscribe(observer);

})();