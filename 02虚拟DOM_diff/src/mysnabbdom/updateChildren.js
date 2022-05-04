import createElement from './createElement'
import patchVnode from './ptachVnode'

// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
  console.info('start')
  console.info(oldCh, newCh)
  // 旧前
  let oldStartIdx = 0
  // 新前
  let newStartIdx = 0
  // 旧后
  let oldEndIdx = oldCh.length - 1
  // 新后
  let newEndIdx = newCh.length - 1
  // 旧前节点
  let oldStartVnode = oldCh[0]
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx]
  // 新前节点
  let newStartVnode = newCh[0]
  // 新后节点
  let newEndVnode = newCh[newEndIdx]
  
  let keyMap = null

  // 开始while
  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 不是判断1、2、3、4命中，而是略过加undefined标记的数据
    if(oldStartVnode === undefined || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if(oldEndVnode === undefined || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if(newStartVnode === undefined || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if(newEndVnode === undefined || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx]
    } else if(checkSameVnode(oldStartVnode, newStartVnode)) {
      // 判断首节点,新前和旧前
      console.info('🪐1 命中')
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if(checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后和旧后
      console.info('🪐2 命中')
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if(checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后和旧前
      console.info('🪐3 命中')
      patchVnode(oldStartVnode, newEndVnode)
      // 新后对应节点，插入旧后的后边??????
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if(checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前和旧后
      console.info('🪐4 命中')
      patchVnode(oldEndVnode, newStartVnode)
      // 新前对应节点，插入旧后前边
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 都没有命中，旧数据for循环查找新前
      if(!keyMap) {
        keyMap = {}
        // 从oldStartIdx到oldEndIdx，创建keyMap映射对象
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key
          if(key !== undefined) {
            keyMap[key] = i
          }
        }
      }
      console.info(keyMap)
      // 寻找这项在keyMap中映射的位置序号
      const idxInOld = keyMap[newStartVnode.key]
      console.info(idxInOld)
      if(idxInOld == undefined) {
        // 判断，如果是undefined，表示是全新项
        // 被加入的项，还不是DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else {
        // 如果不是undefined，不是全新项，要移动
        const elmToMove = oldCh[idxInOld]
        patchVnode(elmToMove, newStartVnode)
        // 把这项设置为undefined,表示已经处理完
        oldCh[idxInOld] = undefined
        // 移动，调用insertBefore实现移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 剩余节点，循环结束start比old小
  if(newStartIdx <= newEndIdx) {
    console.info('new剩余节点没有处理,添加项')
    const before = newCh[newEndIdx+1] ? newCh[newEndIdx+1].elm : null
    for(let i = newStartIdx; i <= newEndIdx; i++) {
      // insetBerfore可以自动识别null，如果是null会排到队尾
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else if(oldStartIdx <= oldEndIdx) {
    console.info('old剩余节点没有处理,删除项')
    // 批量删除oldStart和oldEnd指针之间的项
    for(let i = oldStartIdx; i<= oldEndIdx; i++) {
      if(oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}
