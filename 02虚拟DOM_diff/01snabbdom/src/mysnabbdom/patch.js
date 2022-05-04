import vnode from "./vnode";
import createElement from "./createElement";

export default function patch (oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点
  if(oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 传入DOM节点，包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
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
      if(oldVnode.children !== undefined && oldVnode.children.length > 0) {
        // 新老都有children
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
  } else {
    console.info('不是同一个节点，暴力插入新的，删除旧的')
    let newVnodeElm = createElement(newVnode)
    // 上树
    oldVnode.elm !== undefined &&
      newVnodeElm &&
        oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}