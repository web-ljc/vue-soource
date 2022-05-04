import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from "./ptachVnode";

export default function patch (oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点
  if(oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 传入DOM节点，包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    console.info('是同一个节点')
    patchVnode(oldVnode, newVnode)
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