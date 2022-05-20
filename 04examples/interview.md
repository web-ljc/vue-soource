- 下载vue后，`yarn`安装

- 代码的结构
  - benchmarks 目录做性能测试
  - dist 最终打包出的结果
  - examples 官方例子
  - flow 类型检测（没人用）
  - packages 一些写好的包
  - scripts 所有打包的脚本
  - src 源代码
    - compiler 专门用来模版编译
    - core vue2的核心代码
    - platform 不同平台代码
    - server 服务端渲染
    - sfc 解析单文件组件
    - shared 模块之间的共享属性和方法

- 通过 package.json 文件找到入口
- scripts/config.js (web-full-dev)
- 打包入口
  - web/entry-runtime.js
  - web/entry-runtime-with-compiler.js  // 带有copiler的会重写$mount，将template变成render函数
  - runtime/index.js  // 所谓的运行时，会提供一些DOM操作的api 属性操作、元素操作、提供一些组件和指令
  - core/index.js  // 初始化全局api
  - /instance/index // Vue构造函数


## 1.`Vue2`响应式原理
可以监控一个数据的修改和获取操作，针对对象格式会给每个对象的属性进行劫持  Object.defineProperty
  - 源码 initData -> observe -> defineReactive方法(内部对所有属性进行了重写 性能问题) 递归增加对象中的对象增加 getter 和 setter
  - 我们使用vue时候 如果层级过深，如果数据不是响应式的就不要放在data中了。
  - 我们属性取值的时候尽量避免多次取值
  - 有些对象放在data中但不是响应式的，可以考虑Object.freeze() 来冻结对象

## 5.Vue生命周期钩子是如何实现的
就是内部利用了一个发布订阅模式 将用户写的钩子维护成了一个数组，后续一次调用callback


## 6.Vue生命周期方法有哪些？一般在哪一步发送请求及原因

## 9.`nextTick`在哪里使用？原理是什么？
 - nextTick内部采用了异步任务进行了包装（多个nextTick调用，会合并成一次 内部会合并并回调）最后在异步任务中批处理
 - 主要应用场景是异步更新（默认调度的时候 就会添加一个nextTick任务）用户为了获取最中的渲染结果，需要在内部任务执行之后再执行用户逻辑，用户需要将对应的逻辑放到nextTick中


## 19.keep-alive平时在哪里使用？原理是？
1. keep-alive在路由中使用
2. 在components:is 中使用（缓存）

- keep-alive的原理是 默认缓存加载过的组件对应的实例，内部采用了LRU算法
- 下次组件切换加载的时候，此时会找到对应缓存的节点来进行初始化，但是会采用上次缓存$el来触发。（不用再将虚拟节点转换成真实节点了）通过init ---> prepatch 中
- 更新和销毁会触发actived 和 deactived
