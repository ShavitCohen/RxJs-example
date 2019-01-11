(function () {

  /**************************************************************
   ******* Example 5 Creating Observable and using API **********
   **************************************************************/

  const { Observable, interval, ajax: { ajax } } = rxjs;
  const { switchMap, filter, map } = rxjs.operators;

  const img = document.querySelector('img');
  const showName = document.querySelector('.show-name');
  const plot = document.querySelector('.plot');

  const getApiUrl = index => `https://api.tvmaze.com/shows/${index}?embed[]=cast&embed[]=seasons`;

  const showsObservable$ = startIndex => {
    return Observable.create(observer => {
      const source$ = interval(2000);
      const subscription = source$
        .pipe(
          switchMap(index => {
              const url = getApiUrl(index + startIndex);
              return ajax.get(url);
            },
          ),
          map(ajaxResponse => ajaxResponse.response),
        )
        .subscribe(data => observer.next(data));

      return () => {
        subscription.unsubscribe();
      };
    });
  };

  showsObservable$(1)
    .pipe(
      filter(data => data.code !== 0),
    )
    .subscribe(data => {
      showName.innerHTML = data.name;
      plot.innerHTML = data.summary;
      img.src = data.image.medium;
    });

})();