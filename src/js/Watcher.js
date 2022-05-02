import Dep from "./Dep"

let uuid = 0
export default class Watcher{
  constructor(target, expression, callback) {
    this.id = uuid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }
  update() {
    this.run()
  }
  get() {
    // 进入依赖收集阶段，让全局的Dep.target设置为Watcher本身，那么就会进入依赖收集阶段
    Dep.target = this
    const obj = this.target
    let value
    // 只要能找就一直找,最终设置为null
    try {
      value = this.getter(obj)
    } finally {
      Dep.target = null
    }
    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb) {
    const value = this.get()
    if(value !== this.value || typeof value == 'objcet') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }
}

// 返回函数，可以处理已经结构对象
function parsePath(str) {
  let segments = str.split('.')
  return (obj) => {
    for(let i = 0; i < segments.length; i++) {
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}