(function () {

    /***************************************?**********
     ******* Example 3 From mousemove events **********
     **************************************************/
    const Observable = Rx.Observable;

    const container = document.getElementById('container'),
        box = document.getElementById('box'),
        unsubscribeButton = document.getElementById('unsubscribe-button'),
        events$ = Observable.fromEvent(container, 'mousemove');


    const subscription = events$
        .delay(500)
        .map(item => { // mapping the events stream to a new streeam of objects with {left,top} attributes
            return { left: item.clientX, top: item.clientY }
        })
        .subscribe( //subscribing the observer anonymusly and not like in Example 1 when we created a const of the observer
        item => { //next
            box.style.left = item.left;
            box.style.top = item.top;
        },
        err => { console.log('err') },
        complete => {
            //this will never run since stream of events will never complete
        });

    unsubscribeButton.addEventListener('click', event => subscription.unsubscribe());

})();