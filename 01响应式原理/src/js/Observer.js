// 将一个正常的object转换为每个层级的属性都是响应式（可被侦测的）
import { def } from './utils'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import { observe } from './observe'
import Dep from './Dep'

export default class Observer {
  constructor(value) {
    // 每一个Observer的实例身上都有一个dep
    this.dep = new Dep()
    // 给实例（构造函数中this不是类本身，而是实例）添加了__ob__属性，值是这次new实例
    def(value, '__ob__', this, false)
    // console.info('我是Observer构造器', value)
    // 将传入的value转换成每个层级的属性都是响应式（可以被侦测）的object
    // 检测是数组还是对象
    if(Array.isArray(value)) {
      // 如果是数组，将数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods)
      // 让这个数组变的observe
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  // 遍历
  walk(value) {
    for(let k in value) {
      defineReactive(value, k)
    }
  }
  // 数据遍历
  observeArray(arr) {
    for(let i = 0, l = arr.length; i < l; i++) {
      // 逐项observe数据
      observe(arr[i])
    }
  }
}