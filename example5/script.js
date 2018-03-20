(function () {

  /**************************************************************
   ******* Example 5 Creating Observable and using API **********
   **************************************************************/

  const Observable = Rx.Observable;
  const img = document.querySelector('img');
  const showName = document.querySelector('.show-name');
  const plot = document.querySelector('.plot');
  const getApiUrl = index => `https://api.tvmaze.com/shows/${index}?embed[]=cast&embed[]=seasons`;

  const showsObservable$ = startIndex => {
    return Observable.create(observer => {
      const subscription = Observable.interval(2000)
        .switchMap((index) => {
          const url = getApiUrl(index + startIndex);
          return Observable.fromPromise(fetch(url).then(response => response.json()));
        })
        .subscribe(data => observer.next(data));

      return () => {
        subscription.unsubscribe();
      };
    });
  };

  showsObservable$(1)
    .filter(data => data.code !== 0)
    .subscribe(data => {
      showName.innerHTML = data.name;
      plot.innerHTML = data.summary;
      img.src = data.image.medium;
    });

})();