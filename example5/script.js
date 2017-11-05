(function (){
	
	/***************************************?**********
	 ******* Example 2 From mousemove events **********
	 **************************************************/
	const Observable = Rx.Observable;
	const img = document.querySelector('img');
	const showName = document.querySelector('.show-name');
	const plot = document.querySelector('.plot');
	const getApiUrl = index => `https://api.tvmaze.com/shows/${index}?embed[]=cast&embed[]=seasons`;
	
	const showsObservable$ = startIndex =>{
		return Observable.create(observer =>{
			Observable.interval(2000)
			.subscribe(index =>{
				const url = getApiUrl(index + startIndex);
				fetch(url).then(response =>{
					// Examine the text in the response
					response.json().then(data =>{
						observer.next(data);
					});
				})
			})
		});
	};
	
	showsObservable$(60)
	.filter(data => data.code !== 0)
	.subscribe(data =>{
		showName.innerHTML = data.name;
		plot.innerHTML = data.summary;
		img.src = data.image.medium;
	})
	
})();