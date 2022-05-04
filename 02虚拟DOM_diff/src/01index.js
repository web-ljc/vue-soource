import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数，diff算法的核心函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟DON
const myVnode1 = h('a', {
  props: {
    href: 'http://www.baidu.com',
    target: '_blank'
  }
}, '虚拟节点')

const myVnode2 = h('div', {
  class: {
    'box': true
  }
}, '我是一个盒子')

const myVnode3 = h('ul', [
  h('li', {}, '苹果'),
  h('li', '香蕉'),
  h('li', [
    h('div', '橘子一号'),
    h('div', '橘子2号')
  ])
])

console.info(myVnode1)
console.info(myVnode2)
console.info(myVnode3)

// 让虚拟节点上树
const container = document.getElementById('container')
patch(container, myVnode3)