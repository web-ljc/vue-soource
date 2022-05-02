import { def } from './utils'

// 7种方法被改写 Array.prototype
// psuh pop shift unshift splice sort reverse

// 得到数组原型对象
const arrayPrototype = Array.prototype
// 以数组原型对象，创建arryMethods对象
export const arrayMethods = Object.create(arrayPrototype)

// 要被改写的7个数组方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayPrototype[methodName]
  // 定义新的方法
  def(arrayMethods, methodName, function(){
    // 继承原来方法，获取结果
    const result = original.apply(this, arguments)
    // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？因为数组肯定不是最高层。比如obj.g属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层的时候，已经给g属性添加了__ob__属性
    const ob = this.__ob__
    // 定义插入数据
    let inserted = []
    // 浅拷贝入参
    let arg = [...arguments]
    // 判断调用方法，是否获取入参
    switch(methodName) {
      case 'push':
      case 'unshift':
        inserted = arg
        break
      case 'splice':
        inserted = arg.slice(2)
        breaak
    }
    // 有插入项，处理为响应数据
    if(inserted.length) {
      ob.observeArray(inserted)
    }
    // 发布订阅模式，通知dep
    ob.dep.notify()
    // this谁调用指向谁
    return result
  }, false)
})
