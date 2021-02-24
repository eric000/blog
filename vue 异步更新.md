场景：
```vue
    // 子组件
    ...
    props: {
        val: Boolean,
    },
    ...
    methods: {
        dosome(flag) {
            this.$emit('val', flag)
            
            this.val ? doTrue() : doFalse()
        }
    }
    
    // 父组件
    onChangeVal（val）{
        this.val = val
    }
    ...
```
这个场景还原自一个遗留的bug。
众所周知Vue是异步执行DOM更新，渲染操作推迟到本轮事件循环最后，进而忽略中间的无用功。
JS事件循环机制，`宏-微-宏` 交替。vue 对nextTick的降级实现是promise -> MutationObserver -> setImmediate -> setTimeout 

修改点： 
1. nextTick返回的是 promise， 对触发$emit的方法进行等待，尽量少的操作改动原代码。（watch，计算属性等也是解法不过有点破坏代码结构）
```
async dosome(flag) {
    this.$emit('val', flag)
    await this.$nextTick()
    this.val ? doTrue() : doFalse()
}
```
2. 检查其他代码，是否有偷懒使用setTimeout取巧的。
3. vue3的反应系统不会出现类似问题

[vue 2 异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

[vue 3 反应系统]（https://v3.vuejs.org/guide/reactivity.html#watchers）

