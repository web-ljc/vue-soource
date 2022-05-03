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
 
## 手写diff算法
  - 手写diff算法
  - 虚拟DOM如何通过diff变为真正的DOM
## 备注
  - DOM变为虚拟DOM，属于模版编译原理范畴。mustache