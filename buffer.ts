import { interval, fromEvent } from "rxjs"
import { map, mapTo, filter, switchMap, takeUntil, scan, buffer, debounceTime } from "rxjs/operators"

const display = document.getElementById('display')
const btn = document.getElementById('btn')

const click$ = fromEvent(btn, 'click').pipe(mapTo(1));

click$.pipe(
  scan((acc, curr) => acc + curr, 0),
  buffer(click$.pipe(debounceTime(1000))),
  filter(x => x.length > 0)
)
.subscribe(
  x => console.log(x)
)

