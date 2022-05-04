/* 
  diff算法处理不同新旧节点
*/
import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const myVnode1 = h('h1', {key: 1}, '盒子')
const myVnode2 = h('p', {key: 1}, [
  h('span', {}, 'p-span')
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

const container = document.querySelector('div')
patch(container, myVnode1)
patch(myVnode1, myVnode2)

const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
  patch(myVnode2, myVnode3)
})
