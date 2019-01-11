(function () {

  /***************************************?**********
   ******* Example 3 From mousemove events **********
   **************************************************/
  const { fromEvent } = rxjs;
  const { delay, map, takeUntil, switchMap } = rxjs.operators;

  const container = document.querySelector('#container');
  const box = container.querySelector('#box');
  const unsubscribeButton = container.querySelector('#unsubscribe-button');
  const subscribeButton = container.querySelector('#subscribe-button');

  const subscribeButtonClick$ = fromEvent(subscribeButton, 'click');
  const unsubscribeButtonClick$ = fromEvent(unsubscribeButton, 'click');
  const events$ = fromEvent(container, 'mousemove');

  const trackMouse$ = events$.pipe(
    delay(500),
    map(e => ({ left: e.clientX, top: e.clientY })),
    takeUntil(unsubscribeButtonClick$),
  );

  subscribeButtonClick$
    .pipe(
      switchMap(e => trackMouse$),
    )
    .subscribe( //subscribing the observer anonymusly and not like in Example 1 when we created a const of the observer
      item => { //next
        box.style.left = item.left;
        box.style.top = item.top;
      },
      err => {
        console.log('err');
      },
      complete => {
        //this will never run since stream of events will never complete
      },
    );

})();