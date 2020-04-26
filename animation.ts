import {defer, animationFrames, fromEvent} from 'rxjs'
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame'
import {endWith, map, tap, takeWhile, finalize, mergeMap, concatMap, switchMap } from 'rxjs/operators'
const animation = (duration: number, distance: number) => defer(() => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.className = 'square'

  return animationFrames()
    .pipe(
      map(ms => ms / duration),
      takeWhile(s => s < 1), // take max duaration time
      endWith(1),
      map(v => v * distance),
      tap(x => (div.style.transform = `translate3d(${x}px, 0px, 0px)`)),
      finalize(() => {
        div.remove()
      })
    )
})

const button = document.querySelector("#animationBtn")
fromEvent(button, 'click')
  .pipe(
    mergeMap(div => animation(1000, 800))
  ).subscribe()

animation(2000, 300).subscribe()