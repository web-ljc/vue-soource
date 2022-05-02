import Observer from './Observer'

// 创建observe函数,函数名没有r
export const observe = function(value) {
  // 如果value不是对象，什么都不做
  if(typeof value !== 'object') return
  // 遍历下一层属性，逐个defineReactive
  let ob
  if(typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    // 将产生的实例，逐个添加到__ob__上
    ob = new Observer(value)
  }
  return ob
}
