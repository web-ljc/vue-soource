## snabbdom简介
  - snabbdom是著名的虚拟DOM库，是diff算法的鼻祖，vue源码借鉴了snabbdom
  - 虚拟DOM：用javascript对象描述DOM的层次结构，DOM中的一切属性都在虚拟DOM中有所对应
## sanbbdom的h函数如何工作
  - 虚拟DOM
    - 虚拟节点的属性
    ```js
      {
        children: undefined,
        data: {},
        elm: undefined,
        key: undefined,
        sel: "div",
        text: '一个盒子'
      }
    ```
  - h函数
    - h函数用来产生虚拟节点（vnode）
    - h函数可以嵌套使用
      ```js
        const myVnode3 = h('ul', [
          h('li', {}, '苹果'),
          h('li', '香蕉'),
          h('li', [
            h('div', '橘子一号'),
            h('div', '橘子2号')
          ])
        ])
      ```

## diff算法原理
  - diff是发生在虚拟DOM上的，对新虚拟DOM和老虚拟DOM进行diff比较
  1. key是节点的`唯一标识`，告诉diff算法，更改前后它们是同一个DOM节点
  2. 只有是同一个虚拟节点，才会进行精细化比较，否则就会暴力删除。
    - 同一节点，选择器相同，key相同
  3. 只进行同层比较，不会进行跨层比较
 
## 手写diff算法
  - 手写diff算法
    1. `patch函数`被调用，oldVnode是虚拟节点 / DOM节点
      - DOM节点需要转化为虚拟节点
    2. 判断oldVnode和newVnode是不是一个节点
      - 旧节点的key要和新节点的key相同 && 旧节点的选择器要和新节点的选择器相同
    3. 不是同一节点，暴力删除旧的，插入新的 
      - 创建节点时，子节点需要递归创建
    4. 是同一节点，精细化比较
      - 判断新老虚拟dom是否同一对象
      - 不是，则判断newVonde有没有text属性
      - 不是，则判断oldVnode有没有Children
  - 虚拟DOM如何通过diff变为真正的DOM
## 备注
  - DOM变为虚拟DOM，属于模版编译原理范畴。mustache