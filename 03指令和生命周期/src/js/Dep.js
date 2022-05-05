let uid = 0
export default class Dep{
  constructor() {
    this.id = uid++

    // 用数组存储自己的订阅者，subs是英语subscribes订阅者的意思
    // 数组里面放的是Watcher的实例
    this.subs = []
  }
  // 发布订阅
  addSub(sub) {
    // 添加去重判断
    if(this.subs.includes(sub)) return
    // 收集 watcher 实例
    this.subs.push(sub)
  }
  // 添加依赖
  depend() {
    // Dep.target就是我们自己指定的全局的位置，只要全局唯一，没有歧义就可以
    if(Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 通知更新
  nodify() {
    // 浅克隆
    const subs = this.subs.slice()
    // 遍历
    for(let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
Dep.target = null