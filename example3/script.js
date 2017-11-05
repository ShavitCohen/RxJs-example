(function (){
	
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
	
	const trackMouse$ =
		events$
		.delay(500)
		.map(item => ({ left: item.clientX, top: item.clientY }))
		.takeUntil(unsubscribeButtonClick$);
	
	subscribeButtonClick$.switchMap(e => trackMouse$)
	.subscribe( //subscribing the observer anonymusly and not like in Example 1 when we created a const of the observer
		item =>{ //next
			box.style.left = item.left;
			box.style.top = item.top;
		},
		err =>{
			console.log('err')
		},
		complete =>{
			//this will never run since stream of events will never complete
		});
	
})();