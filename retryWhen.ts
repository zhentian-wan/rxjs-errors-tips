import { interval, concat, throwError, timer } from 'rxjs'; 
import { map, catchError, retryWhen, delay, take, concatMap, delayWhen } from 'rxjs/operators';


interval(500)
  .pipe(
    map(i => {
      if (i === 3) {
        throw Error('Not yet three')
      }
      return i
    }),
    retryWhen(err => {
      return err.pipe(
        delayWhen(() => timer(500)),
        take(3),
        o => concat(o, throwError('bad'))
      )
    })
  )
  .subscribe(
    x => console.log('success', x),
    err => console.error(err),
    () => console.log('done')
  )