import vnode from "./vnode";

/*
  低配版h函数，必须接受3个参数
  形态
    1. h('div', {}, '文字')
    1. h('div', {}, [])
    1. h('div', {}, h())
*/
export default function(sel, data, c) {
  if(arguments.length !== 3)
    throw new Error('对不起，h函数必须传入3个参数，低配版h函数')
  if(typeof c === 'string' || typeof c === 'number') {
    // 调用形态1
    return vnode(sel, data, undefined, c, undefined)
  } else if(Array.isArray(c)) {
    // 调用形态2
    let children = []
    for(let i = 0; i < c.length; i++) {
      // 检查c[i]必须是一个对象
      if(!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel')))
        throw new Error( i+1 + '传入参数类型不对')
      // 收集数据
      children.push(c[i])
    }
    // 循环结束，就说明children收集完了，返回虚拟节点
    return vnode(sel, data, children, undefined, undefined)
  } else if(typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 调用形态3
    let children =[c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('传入第三个参数类型不对')
  }
}