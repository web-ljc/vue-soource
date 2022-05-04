import createElement from "./createElement";

export default function patchVnode(oldVnode, newVnode) {
  // 1是否同一个对象
  if(oldVnode === newVnode) return
  // 2判断新vnode有没有text属性
  if(newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
    // 新vnode有text属性
    if(oldVnode.text !== newVnode.text) {
      // 旧虚拟节点中的textt和新虚拟节点中的text不同，直接替换
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // 新vnode没有text属性
    console.info('新vnode没有text属性')
    if(oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 新老都有children
      // 所有未处理的节点开头
      
    } else {
      // 老的没有children，新的有children
      // 清空老节点的内容
      oldVnode.elm.innerText = ''
      for(let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i])
        oldVnode.elm.appendChild(dom)
      }
    }
  }
}