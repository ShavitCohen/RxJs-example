(function () {

    /******************************************************************************
     ******* Example 2 Tracking the mouse with delay by using Observable **********
     ******************************************************************************/
    const Observable = Rx.Observable;

    const container = document.getElementById('container'),
        box = document.getElementById('box'),
        unsubscribeButton = document.getElementById('unsubscribe-button'),
        events$ = Observable.fromEvent(container, 'mousemove');         //creating an Observable source from mousemove DOM events

    const subscription =
        events$
            .delay(500)                                                 //delay (as an example)
            .map(item => {                                              //mapping to a stream of objects with {left,top} attributes
                return { left: item.clientX, top: item.clientY }
            })
            .subscribe(                                                 //subscribing the observer anonymously
            item => { //next
                box.style.left = item.left;
                box.style.top = item.top;
            },
            err => { console.log('err') },
            complete => {
                //this will never run since stream of events will never complete
            });

    unsubscribeButton.addEventListener('click', event => subscription.unsubscribe()); //unsubscribing on click

})();