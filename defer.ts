
import { of, defer} from 'rxjs'; 

class Foo {
  private num = 123
  onum = defer(() => of(this.num));

  updateNum(val) {
    this.num = val;
  }
}

const f = new Foo();
f.updateNum(321)
f.onum.subscribe(x => console.log(x)) // 321

