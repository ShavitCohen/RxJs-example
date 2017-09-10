(function () {

    /***************************************?**********
     ******* Example 5 Real data source **********
     **************************************************/
    const Observable = Rx.Observable;
    const img = document.querySelector('img');
    const showName = document.querySelector('.show-name');
    const plot = document.querySelector('.plot');
    let showIndex = 1;
    const API_URL = `https://api.tvmaze.com/shows/${showIndex}?embed[]=cast&embed[]=seasons`;

})();