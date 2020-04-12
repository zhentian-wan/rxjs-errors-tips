import { interval, fromEvent } from "rxjs"
import { map, mapTo, filter, switchMap, takeUntil } from "rxjs/operators"

const display = document.getElementById('display')
const toggle = document.getElementById('toggle')

const source$ = interval(100).pipe(
  mapTo('.')
)
const cheked$ = fromEvent(toggle, 'change')
  .pipe(
    map(e => e.target['checked'])
  )
const start$ = cheked$.pipe(
  filter(x => x === true)
)
const stop$ = cheked$.pipe(
  filter(x => x === false)
)

start$
.pipe(
  switchMap(() => source$.pipe(takeUntil(stop$)))
)
.subscribe(
  str => display.innerHTML += str
)