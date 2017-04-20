(function () {

    /***************************************************************************
     ******* Example 1 - Populating ul from array by using Observable **********
     ***************************************************************************/
    const Observable = Rx.Observable;

    const arr = [
        { url: 'http://www.google.com', text: 'Google' },
        { url: '', text: 'GitHub' },
        { url: 'http://www.facebook.com', text: 'Facebook' },
        { url: 'http://www.twitter.com', text: 'Twitter' },
        { url: '', text: 'BitBucket' },
        { url: 'http://www.tikalk.com', text: 'Tikal' }
    ];

    const arr$ = Observable.from(arr);                      //creating an Observable source from an array

    const filteredItems$ = arr$
        .filter(item => !!item.url)                         //filtering items where the url value is missing
        .map(item => {                                      //mapping to <li> elements
            const li = document.createElement('li'),
                a = document.createElement('a');

            a.href = item.url;
            a.innerHTML = item.text;

            li.appendChild(a);

            return li;
        });

    const observer = {                                      //creating the observer manually which populate the ul
        next: item => document.getElementById('my-list').appendChild(item),
        error: err => console.log('err'),
        complete: () => console.log('operation complete')
    }

    filteredItems$.subscribe(observer);                     //subscribing to the Observable

})();