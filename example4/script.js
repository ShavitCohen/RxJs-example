(function () {

  /******************************************************
   ******* Example 4 type like effect using zip **********
   *******************************************************/
  const { from, interval } = rxjs;
  const { zip, map } = rxjs.operators;

  const arr = `
	Hi, What is your name?
	Can you solve the maze ?
	I don't know where I am all I know the first code is !@ffds#$%@
	`;

  const source$ = from(arr);
  const txt$ = source$
    .pipe(
      zip(interval(100)),
      map(val => val[0]),
      map(char => char === `\n` ? '<br />' : char),
    );

  txt$.subscribe({
    next: (char) => document.querySelector('#content').innerHTML += char,
  });

})();