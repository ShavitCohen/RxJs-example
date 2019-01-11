(function () {

  /*******************************************************
   ******* Example 2 - Populating ul from array **********
   *******************************************************/
  const Observable = Rx.Observable;

  const arr = [
    { url: 'http://www.google.com', text: 'Google' },
    { url: '', text: 'GitHub' },
    { url: 'http://www.facebook.com', text: 'Facebook' },
    { url: 'http://www.twitter.com', text: 'Twitter' },
    { url: '', text: 'BitBucket' },
    { url: 'http://www.tikalk.com', text: 'Tikal' },
  ];

  const stream$ = Observable.from(arr)
    .filter(obj => !!obj.url)
    .map(obj => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.text = obj.text;
      a.href = obj.url;

      li.appendChild(a);

      return li;
    })
    .zip(Observable.interval(400))
    .map(arr => arr[0]);

  const observer = {
    next: li => document.querySelector('#my-list').appendChild(li),
    error: ex => console.log(ex),
    complete: () => console.log('completed'),
  };

  stream$.subscribe(observer);

})();