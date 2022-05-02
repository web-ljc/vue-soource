import { observe } from './observe'
import Watcher from './Watcher'

let obj = {
  a: {
    m: {
      n: 5  
    }
  },
  b: 10,
  c: [1, 2, 3]
}
observe(obj)
console.error(111111111111)
new Watcher(obj, 'a.m.n', (val) => {
  console.info(val)
})
// debugger
console.error(22222222222222)
obj.a.m.n = 88
console.error(obj, 6666666)
obj.a.m.n = 89
// obj.a.m.n = 99
// console.error(obj, 44444444444444)


