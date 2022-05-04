import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const myVnode1 = h('h1', {key: 1}, '老的DOM，纯文字')

// 新虚拟DOM如果是text值，直接替换老虚拟DOM内容
// const myVnode2 = h('h1', {key: 1}, '新的DOM，纯文字')

// 新虚拟ODM2是Children，判断老虚拟DOM的内容
const myVnode2 = h('ul', {key: 1}, [
  h('li', {key: 'A'}, '新的虚拟DOM'),
  h('li', {key: 'B'}, '新的虚拟DOM2')
])

console.info(myVnode1)
console.info(myVnode2)

// 新虚拟DOM3有Children
const myVnode3 = h('ul', {key: 1}, [
  h('li', {key: 'A'}, '苹果'),
  h('li', {key: 'C'}, '香蕉'),
  h('li', {key: 'D'}, '菠萝'),
  h('li', {key: 'B'}, [
    h('div', {}, '橘子一号'),
    h('div', {}, '橘子2号')
  ]),
  h('li', {key: 'D'}, '桃子'),
])


const container = document.querySelector('div')
patch(container, myVnode1)
patch(myVnode1, myVnode2)

const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
  patch(myVnode2, myVnode3)
})
