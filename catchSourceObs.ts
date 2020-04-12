import { of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
 
of(1, 2, 3, 4, 5).pipe(
    map(n => {
  	   if (n === 4) {
  	     throw 'four!';
      }
	     return n;
    }),
    catchError((err, caught) => caught),
    take(30),
  )
  .subscribe(x => console.log(x));
  // 1, 2, 3, 1, 2, 3, ...