(function () {

  /***************************************?**********
   ******* Example 3 From mousemove events **********
   **************************************************/
  const { fromEvent } = rxjs;

  const container = document.querySelector('#container'),
    box = container.querySelector('#box'),
    unsubscribeButton = container.querySelector('#unsubscribe-button'),
    subscribeButton = container.querySelector('#subscribe-button'),

    subscribeButtonClick$ = fromEvent(subscribeButton, 'click'),
    unsubscribeButtonClick$ = fromEvent(unsubscribeButton, 'click'),
    events$ = fromEvent(container, 'mousemove');

})();