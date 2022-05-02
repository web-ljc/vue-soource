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
  // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？因为数组肯定不是最高层
  // 比如obj.g属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层的时候，已经给g属性添加了__ob__属性
  // 定义新的方法
  def(arrayMethods, methodName, function(){
    const ob = this.__ob__
    let inserted = []
    let arg = [...arguments]
    switch(methodName) {
      case 'push':
      case 'unshift':
        inserted = arg
        break
      case 'splice':
        inserted = arg.slice(2)
        breaak
    }
    if(inserted.length) {
      ob.observeArray(inserted)
    }
    ob.dep.notify()
    // this谁调用指向谁
    original.apply(this, arguments)
  }, false)
})
