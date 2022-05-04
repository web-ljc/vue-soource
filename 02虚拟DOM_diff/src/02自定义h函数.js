import h from './mysnabbdom/h'

const myVnode1 = h('div', {}, '盒子')
const myVnode2 = h('div', {}, [
  h('p', {}, 'one'),
  h('p', {}, h('p', {}, 'two')),
])
const myVnode3 = h('ul', {}, [
  h('li', {}, '苹果'),
  h('li', {}, '香蕉'),
  h('li', {}, [
    h('div', {}, '橘子一号'),
    h('div', {}, '橘子2号')
  ])
])
console.info(myVnode1)
console.info(myVnode2)
console.info(myVnode3)