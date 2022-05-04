import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const vnode1 = h('div', {}, [
  h('p', {key: 'A', data:1}, 'A'),
  h('p', {key: 'B'}, 'B'),
  h('p', {key: 'C'}, 'C'),
  h('p', {key: 'D'}, 'D')
])
const vnode2 = h('div', {}, [
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'A', data:2}, 'A'),
    h('p', {key: 'C'}, 'C'),
    h('p', {key: 'D'}, 'D'),
    h('p', {key: 'E'}, 'E'),
  ]
)

// 虚拟节点上树
const container = document.querySelector('#container')
patch(container, vnode1)

const btn = document.querySelector('button')
btn.addEventListener('click', () => {
  patch(vnode1, vnode2)
})

