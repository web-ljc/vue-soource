import Watcher from "./js/Watcher"

export default class Compile{
  constructor(el, vue) {
    // 实例
    this.$vue = vue
    // 挂载点
    this.$el = document.querySelector(el)
    // 如果用户传入了挂载点
    if(this.$el) {
      // 调用函数，让节点让成fragment，类似于mustache中的tokens。实际上用的AST，这里就是轻量级的
      let $fragment= this.node2Fragment(this.$el)
      // 编译
      this.compile($fragment)
      // 替换好的内容上树
      this.$el.appendChild($fragment)
    }
  }
  // 获取挂载点的子DOM节点
  node2Fragment(el) {
    // 创建虚拟节点的对象，新的空白文档
    let fragment = document.createDocumentFragment()
    let child
    // 将el下的DOM节点赋值给child，知道没有为止
    while(child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }
  // 编译挂载点
  compile(el) {
    let childNodes = el.childNodes
    let self = this

    let reg = /\{\{(.*)\}\}/
    // 节点遍历
    childNodes.forEach(node => {
      let text = node.textContent
      if(node.nodeType === 1) {
        self.compileElement(node)
      } else if (node.nodeType === 3 && reg.test(text)) {
        // s.match(reg) 返回正则匹配数组
        let name = text.match(reg)[1]
        self.compileText(node, name)
      }
    })
  }
  // 元素节点，进行处理
  compileElement(node) {
    let self = this
    // 不是将HTML看作字符串，是属性列表
    let nodeAttr = node.attributes
    // console.info(nodeAttr)
    // 类数组对象变为数组
    Array.prototype.slice.call(nodeAttr).forEach(attr => {
      // 分析指令
      let attrName = attr.name
      let value = attr.value
      // 指令都是v-开头
      let dir = attrName.substring(2)
      // 看是不是指令
      if(attrName.indexOf('v-') === 0) {
        if(dir === 'model') {
          // 1依赖收集
          new Watcher(self.$vue, value, value => node.value = value)
          // 2获取对应值,并赋值
          var v = self.getVueVal(self.$vue, value)
          node.value = v
          // 3添加事件更改值
          node.addEventListener('input', e => {
            var newVal = e.target.value
            // self.$vue.age = newVal
            self.setVueVal(self.$vue, value, newVal)
          })
        } else if (dir === 'if') {
          console.info('发现if')
        }
      }
    })
  }
  // 文本节点，进行处理
  compileText(node, name) {
    // 获取值
    node.textContent = this.getVueVal(this.$vue, name)
    // 依赖收集
    new Watcher(this.$vue, name, value => node.textContent = value)
  }

  getVueVal(vue, exp) {
    let val = vue
    exp = exp.split('.')
    exp.forEach(k => {
      val = val[k]
    })
    return val
  }
  setVueVal(vue, exp, value) {
    let val = vue
    exp = exp.split('.')
    exp.forEach((k, i) => {
      if(i < exp.length -1) {
        val = val[k]
      } else {
        val[k] = value
      }
    })
  }
}