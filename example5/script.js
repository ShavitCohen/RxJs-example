(function () {

  /**************************************************************
   ******* Example 5 Creating Observable and using API **********
   **************************************************************/

  const Observable = Rx.Observable;
  const img = document.querySelector('img');
  const showName = document.querySelector('.show-name');
  const plot = document.querySelector('.plot');
  const getApiUrl = index => `https://api.tvmaze.com/shows/${index}?embed[]=cast&embed[]=seasons`;

  const myObserable$ = Observable.create(observer => {
    observer.next('a');
    setTimeout(() => {
      observer.next('b');
      observer.complete();
    }, 1000);

  });

  const observer = {
    next: char => console.log(char),
    complete: () => console.log('completed'),
  };

  myObserable$.subscribe(observer);

})();