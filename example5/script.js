(function (){
	
	/***************************************?**********
	 ******* Example 2 From mousemove events **********
	 **************************************************/
	const Observable = Rx.Observable;
	const img = document.querySelector('img');
	const showName = document.querySelector('.show-name');
	const plot = document.querySelector('.plot');
	
	const showsObservable$ = Observable.create(observer =>{
		const BASE_URL = 'https://api.tvmaze.com';
		const startIndex = 1;
		Observable.interval(2000)
		.subscribe(index =>{
			const url = `${BASE_URL}/shows/${index + startIndex}?embed[]=cast&embed[]=seasons`;
			fetch(url).then(response =>{
				// Examine the text in the response
				response.json().then(data =>{
					observer.next(data);
				});
			})
		})
	});
	
	showsObservable$
	.filter(data => data.code !== 0)
	.subscribe(data =>{
		showName.innerHTML = data.name;
		plot.innerHTML = data.summary;
		img.src = data.image.medium;
	})
	
})();