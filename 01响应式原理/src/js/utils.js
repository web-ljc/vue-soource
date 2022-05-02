// 使用访问器属性，定义对象属性
export const def = function(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    // 是可被枚举
    enumerable,
    // 可被重写
    writable: true,
    // 可被配置
    configurable: true
  })
}