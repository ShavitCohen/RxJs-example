(function () {

    /***************************************?**********
     ******* Example 2 From mousemove events **********
     **************************************************/
    const Observable = Rx.Observable;

    let arr = '';
    arr += 'Hi, What is your name?';
    arr += '|';
    arr += 'Can you solve the maze ?'
    arr += '|';
    arr += `I don't know where I am all I know the first code is !@ffds#$%@`

    const txt$ = Observable.from(arr);

    txt$
        .zip(Observable.interval(100))
        .map(val => val[0])
        .map(char => char === '|' ? '<br />' : char)
        .subscribe({
            next: (x) => document.querySelector('#content').innerHTML += x
        })

})();