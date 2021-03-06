(function () {

  /*******************************************************
   ******* Example 2 - Populating ul from array **********
   *******************************************************/
  const { from } = rxjs;
  const { filter, map } = rxjs.operators;

  const arr = [
    { url: 'http://www.google.com', text: 'Google' },
    { url: '', text: 'GitHub' },
    { url: 'http://www.facebook.com', text: 'Facebook' },
    { url: 'http://www.twitter.com', text: 'Twitter' },
    { url: '', text: 'BitBucket' },
    { url: 'http://www.tikalk.com', text: 'Tikal' },
  ];

  const source$ = from(arr);
  const arr$ = source$
    .pipe(
      filter(item => !!item.url),
      map(item => {
        const li = document.createElement('li'),
          a = document.createElement('a');

        a.href = item.url;
        a.innerHTML = item.text;

        li.appendChild(a);

        return li;
      }),
    );

  const observer = {
    next: item => document.getElementById('my-list').appendChild(item),
    error: err => console.log('err'),
    complete: () => console.log('operation complete'),
  };

  arr$.subscribe(observer);

})();