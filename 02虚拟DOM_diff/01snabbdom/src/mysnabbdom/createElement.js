// 创建节点
export default function createElement (vnode) {
  console.info('将虚拟节点插入标杆前')
  // 创建一个节点
  let domNode = document.createElement(vnode.sel)
  if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length ===0)) {
    // 只有文本
    domNode.innerText = vnode.text
  } else if(Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 子节点
    for(let i = 0; i < vnode.children.length; i++){
      let ch = vnode.children[i]
      // 获取子节点DOM，等待上树
      let chDom = createElement(ch)
      // 父节点拼接子节点DOM
      domNode.appendChild(chDom)
    }
  }
  // 补充elm属性
  vnode.elm = domNode
  // 返回elm，elm属性是一个纯DOM对象
  return vnode.elm
}