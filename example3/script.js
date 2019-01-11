(function () {

  /***************************************?**********
   ******* Example 3 From mousemove events **********
   **************************************************/
  const Observable = Rx.Observable;

  const container = document.querySelector('#container'),
    box = container.querySelector('#box'),
    unsubscribeButton = container.querySelector('#unsubscribe-button'),
    subscribeButton = container.querySelector('#subscribe-button'),
    subscribeButtonClick$ = Observable.fromEvent(subscribeButton, 'click'),
    unsubscribeButtonClick$ = Observable.fromEvent(unsubscribeButton, 'click'),
    events$ = Observable.fromEvent(container, 'mousemove');

  const stream$ = subscribeButtonClick$;

  const stream2$ = stream$
    .switchMap(() => events$)
    .map(({ clientX, clientY }) => ({ clientX, clientY }))
    .delay(400)
    .takeUntil(unsubscribeButtonClick$);

  const observer = {
    next: obj => {
      box.style.left = obj.clientX;
      box.style.top = obj.clientY;
    },
  };

  stream2$.subscribe(observer);

})();