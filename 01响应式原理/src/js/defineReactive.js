import { observe } from './observe'
import Dep from './Dep'

// 封装defineProperty
// 构建闭包环境，不用定义临时变量
export default function defineReactive(data, key, val) {
  // 闭包函数内创建封闭的Dep实例
  const dep = new Dep()

  if(arguments.length === 2) val = data[key]
  // 子元素要进行observe，至此形成递归，这个递归不是函数自己调用自己，而是多个函数，类循环调用
  let childOb = observe(val)
  
  Object.defineProperty(data, key, {
    // 可被枚举
    enumerable: true,
    // 可被配置，比如被delete
    configurable: true,
    get() {
      console.info(`你访问${key}属性`)
      // 如果处于收集阶段
      if(Dep.target) {
        console.info(dep, 'dep数据收集22222222')
        dep.depend()
        if(childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      console.info(`你试图改变${key}属性`, newValue)
      if(val === newValue) return
      val = newValue
      // 当设置了新值，这个值也要被observe
      childOb = observe(newValue)

      // 发布订阅模式，通知dep
      dep.nodify()
    }
  })
}
