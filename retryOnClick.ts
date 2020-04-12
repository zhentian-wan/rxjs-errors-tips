import { interval, throwError, fromEvent , concat, timer} from 'rxjs'; 
import { map, catchError, retryWhen, delay, take, switchMap, mapTo, tap, delayWhen } from 'rxjs/operators';

const click = document.getElementById('btn')
const click$ = fromEvent(click, 'click').pipe(mapTo('click'),tap(console.log));

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
        switchMap(er => click$),
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