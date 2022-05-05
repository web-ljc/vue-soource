import Compile from './Compile'
import { observe } from './js/observe'
import Watcher from './js/Watcher'

export default class Vue {
  constructor(options) {
    // 把参数options对象存为$options
    this.$options = options || {}
    // 数据
    this._data = options.data
    observe(this._data)
    console.info(this._data, 9998888)
    // 数据要变成响应式的,这里就是声明周期
    this._initData()
    console.info(this, 777777777)
    // 调用默认的watch
    this._initWatch()

    // 编译模版
    new Compile(options.el, this)
  }

  // 初始化数据
  _initData() {
    let self = this;
    // 将data中的数据绑定到self中
    Object.keys(self._data).forEach(key => {
      Object.defineProperty(self, key, {
        get() {
          return self._data[key]
        },
        set(newVal) {
          self._data[key] = newVal
        }
      })
    })
  }

  // watch对象中属性监听
  _initWatch() {
    let self = this
    let watch = this.$options.watch
    Object.keys(watch).forEach(key => {
      new Watcher(self, key, watch[key])
    })
  }
}