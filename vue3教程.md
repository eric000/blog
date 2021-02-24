# vue3教程

[toc]

## 特点
- 更快
    - 重构virtual dom
        - 标记静态节点和区分动态内容
        - 非组件级别diff，diff动态部分
    - 事件缓存
    - 响应式对象实现改为proxy
- 更小
    - Tree shaking（项目和API）
- 更易维护
    - flow -> typescript
    - 管理代码： monorepo
- 新功能和特性
    - 组合式 API/ [Composition API](https://vue-composition-api-rfc.netlify.app/zh/api.html#setup)
        - setup
        - 响应式API (ref、reactive)及辅助（watch、watchEffect、computed）
        - Fragments、 teleport、 Suspense（和React相似特性）
    - vite

## 生态圈

### vue router
- 函数式API 
    - `new VueRouter   -> createRouter({})`
    - mode: `"history"  ->  history: createWebHistory()`
- 自定义正则匹配  `* ->  /:catchAll(.*)  `
- `router.match` 和 `router.resolve` 合并为 `router.resolve`
- transition 使用需等待router准备好才能挂载应用 `router.isReady().then(() => app.mount( #app ))`
- 无命中路由，将引发错误

```
import { useRoute, useRouter } from  vue-next-router
...
setup() {
  const route = useRoute()
  const router = useRouter()
  ...
  // router -> this.$router
  // route > this.$route
  router.push( /foo )
  console.log(route) // 路由对象信息
}
```


### Vuex

> Vuex is a state management pattern + library for Vue.js applications. 

现在项目使用极少，而且缺少复杂的树状跨级状态，更多的是父子孙共享数据，局部注入可能更合适。

> React 社区在 HOOK API 出现后很快就使用 useReducer、useContext 代替了 Redux 进行状态管理一样
特点： 
 - 较vuex缺少事件旅行和快照
 - 逻辑聚合、和Vue3 API一致、单一文件管理
 - 路径清晰，方便跳转

```
import {provide, inject, computed, ref, Ref} from '@vue/composition-api'
const ClassSymbol = Symbol()

export const useClassProvide = () => {
  // 班级信息
  const class = ref({})
  const setClass = (value) => (class.value = value)

  provide(ClassSymbol, {
    class,
    setClass,
  })
}

export const useClassInject = () => {
  const classContext = inject(ClassSymbol)

  if (!classContext) {
    throw new Error(`useClassInject must be used after useClassProvide`)
  }
  return classContext
}

// 注入文件
new Vue({
  router,
  setup() {
    useProvider()
    return {}
  },
  render: h => h(App),
}).$mount('#app')

// 使用文件
export default createComponent({
  name: 'class',
  setup() {
    const { class, setClass } = useClassInject();

    const loading = useAsync(async () => {
      const result = await getClassInfo();
      setClass(result);
    });

    return { class, loading };
  },
});

```

### 组件库

- antd-vue (13K) 非官方团队
- element3 (2.4K) 培训机构项目
- element plus (7.3K) 非element原团队
- ElementUI (48.4K) 只是个提供对比数据的项
- Vant (16.4k) 有赞移动UI

[吃瓜链接](https://www.zhihu.com/question/433505607)

###  vue-composition-api 库
方便vue2.0过度

## API和生命周期
![生命周期](https://vue3js.cn/docs/zh/images/lifecycle.png)
![vue2/ vue3代码结构](https://user-images.githubusercontent.com/499550/62783026-810e6180-ba89-11e9-8774-e7771c8095d6.png)

![Composition API](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2dpZi9oT2J6MGplbnhpY0JuaWFBT0R5R21OY2ZpYlExdHRzc3BuektHbHdrRGlia0huMTFwZDFkYjlJMWdIREN4MlFYaWFlenQ1cWJ5Y0hkanhUMXMwdVAzUUxXdGtnLzY0MA?x-oss-process=image/format,png)

### setup 函数
vue3 的 Composition API 新特性提供了统一的入口, setup 函数会在 beforeCreate 之后、created 之前执行.

```js
/**
 * @param {object} props 用来接收 props 数据
 * @param {object} context 用来定义上下文, 上下文对象中包含了一些有用的属性，这些属性在 vue 2.x 中需要通过 this 才能访问到, 在 setup() 函数中无法访问到 this，是个 undefined
 * @return {object} 返回响应式数据, 模版中需要使用的函数
 */
setup(props, context) {
  context.attrs
  context.slots
  context.parent
  context.root
  context.emit
  context.refs

  return {

  }
}
```

### ref 函数
ref() 函数用来根据给定的值(及基本类型)创建一个响应式的数据对象，ref() 函数调用的返回值是一个对象，这个对象上只包含一个 value 属性, 只在 setup 函数内部访问 ref 函数需要加.value
```vue
<template>
    <div class="main">
        {{count}} // 1
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const count = ref<number>(1)
    // 在 setup 中获取ref 中定义的值, 需要通过value属性
    console.log(count.value);
    return {
      count
    }
   }
});
</script>

```

### reactive 函数
reactive() 函数接收一个"普通对象"，返回一个响应式的数据对象, 想要使用创建的响应式数据也很简单，创建出来之后，在 setup 中 return 出去，直接在 template 中调用即可

响应式的对象如果被解构或展开，则相关的属性会丢失响应性，可以通过toRefs(reactive(xxx))来处理
```vue
<template>
  {{name}} // test
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
export default defineComponent({
  setup(props, context) {

    let state = reactive({
      name: 'test'
    });

    return state
  }
});
</script>
```

在 reactive 对象中访问 ref 创建的响应式数据
```vue
<template>
    <div class="mine">
        {{count}} -{{t}}  <!-- 10 -100 -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
export default defineComponent({
  setup() {
    const count = ref<number>(10)
    const obj = reactive({
      t: 100,
      count
    })
    // 通过reactive 来获取ref 的值时,不需要使用.value属性
    console.log(obj.count);
    return {
       ...toRefs(obj)
    }
   }
});
</script>
```

### 响应式数据相关API
> Proxy vs 原始标识. Proxy 的使用确实引入了一个需要注意的新警告：在身份比较方面，被代理对象与原始对象不相等

- isRef() 函数， 判断某个值是否为 ref() 创建出来的对象
- toRefs() 函数， 将 reactive() 创建出来的响应式对象，转换为普通的对象
- isReactive() 函数， 检查对象是否是 reactive创建的响应式 proxy
- readonly() 函数， 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
- isReadonly() 函数， 检查对象是否是由readonly创建的只读代理
- toRaw() 函数， 返回 reactive 或 readonly 代理的原始对象
- shallowReactive() 函数， 定义浅响应数据

### computed() 函数
用来创造计算属性，和过去一样，它返回的值是一个 ref 对象。里面可以传方法，或者一个对象，对象中包含 set()、get()方法
```vue
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  setup(props, context) {
    const age = ref<number>(18)

    const computedAge = computed({
      get: () => age.value + 1,
      set: value => age.value + value
    })
    // 为计算属性赋值的操作，会触发 set 函数, 触发 set 函数后，age 的值会被更新
    age.value = 100
    return {
      age,
      computedAge
    }
  }
});
</script>
```

### watch() 函数
watch 函数用来侦听特定的数据源，并在回调函数中执行副作用。默认情况是懒执行的，也就是说仅在侦听的源数据变更时才执行回调。

#### 监听多个数据源
```ts
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
interface Person {
  name: string,
  age: number
}
export default defineComponent({
  setup(props, context) {
    const state = reactive<Person>({ name: 'vue', age: 10 })

    watch(
      [() => state.age, () => state.name],
      ([newName, newAge], [oldName, oldAge]) => {
        console.log(newName);
        console.log(newAge);

        console.log(oldName);
        console.log(oldAge);
      }
    )
    // 修改age 时会触发watch 的回调, 打印变更前后的值, 此时需要注意, 更改其中一个值, 都会执行watch的回调
    state.age = 100
    state.name = 'vue3'
    return {
      ...toRefs(state)
    }
  }
});
</script>
```
#### stop 停止监听
setup() 函数内创建的 watch 监视，会在当前组件被销毁的时候自动停止。如果想要明确地停止某个监视，可以调用 watch() 函数的返回值即可，语法如下：

```ts
import { set } from 'lodash';
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
interface Person {
  name: string,
  age: number
}
export default defineComponent({
  setup(props, context) {
    const state = reactive<Person>({ name: 'vue', age: 10 })

    const stop =  watch(
      [() => state.age, () => state.name],
      ([newName, newAge], [oldName, oldAge]) => {
        console.log(newName);
        console.log(newAge);

        console.log(oldName);
        console.log(oldAge);
      }
    )
    // 修改age 时会触发watch 的回调, 打印变更前后的值, 此时需要注意, 更改其中一个值, 都会执行watch的回调
    state.age = 100
    state.name = 'vue3'

    setTimeout(()=> {
      stop()
      // 此时修改时, 不会触发watch 回调
      state.age = 1000
      state.name = 'vue3-'
    }, 1000) // 1秒之后讲取消watch的监听

    return {
      ...toRefs(state)
    }
  }
});

```

#### watchEffect
```ts
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```
- watchEffect 不需要指定监听属性
- watch 能够获的新值与旧值，而 watchEffect 不能
- watchEffect 在组件初始化的时候就会执行一次用以收集依赖（与computed同理），而后收集到的依赖发生变化，这个回调才会再次执行，而 watch 不须要。
- 抛弃无效的副作用，避免竟态问题
- 组件被卸载，那么 watchEffect() 也将被 stop

```ts
watchEffect(async (onInvalidate) => {
    let validate = true
    onInvalidate(() => {
        validate = false
    })
    const data = await fetch(obj.foo)
    if (validate){
        /* 正常使用 data */
    } else {
        /* 说明当前副作用已经无效了，抛弃即可 */
    }
})
```


### refs
```vue
<template>
  <!--第一步：还是跟往常一样，在 html 中写入 ref 的名称-->
  <div class="main" ref="elRefs">
    <span>vue</span>
  </div>
</template>

<script lang="ts">
import { set } from 'lodash';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  setup(props, context) {
    // 获取真实dom
    const elRefs = ref<null | HTMLElement>(null);
    onMounted (() => {
      console.log(elRefs.value); // 得到一个 RefImpl 的对象, 通过 .value 访问到数据
    })

    return {
      elRefs
    }
  }
});
</script>

```

### LifeCycle Hooks(新的生命后期)


### Suspense 组件
> React  Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染。
```ts
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./AsyncComponent.vue')
)

app.component('async-component', AsyncComp)

```
以及组件

```vue
<template>
  <Suspense>
    <template #default>
      <my-component />
    </template>
    <template #fallback>
      Loading ...
    </template>
  </Suspense>
</template>
```


### vue 3.x 完整组件模版结构

组成： 组件名称、 props、components、setup(hooks、computed、watch、methods 等)

```vue
<template>
  <div class="mine" ref="elmRefs">
    <span>{{name}}</span>
    <br>
    <span>{{count}}</span>
    <div>
      <button @click="handleClick">测试按钮</button>
    </div>

    <ul>
      <li v-for="item in list" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, PropType, reactive, ref, toRefs } from 'vue';

interface IState {
  count: 0,
  name: string,
  list: Array<object>
}

export default defineComponent({
  name: 'demo',
  // 父组件传子组件参数
  props: {
    name: {
      type: String as PropType<null | ''>,
      default: 'vue3.x'
    },
    list: {
      type: Array as PropType<object[]>,
      default: () => []
    }
  },
  components: {
    /// TODO 组件注册
  },
  emits: ["emits-name"], // 为了提示作用
  setup (props, context) {
    console.log(props.name)
    console.log(props.list)


    const state = reactive<IState>({
      name: 'vue 3.0 组件',
      count: 0,
      list: [
        {
          name: 'vue',
          id: 1
        },
        {
          name: 'vuex',
          id: 2
        }
      ]
    })

    const a = computed(() => state.name)

    onMounted(() => {

    })

    function handleClick () {
      state.count ++
      // 调用父组件的方法
      context.emit('emits-name', state.count)
    }

    return {
      ...toRefs(state),
      handleClick
    }
  }
});
</script>
```


## 最佳实战
1. 从Mixin到到Composition API


2. Vue2使用Composition API

3. Composition API 使用规范
  Vue 3 hooks 约定：
    - 使用解构
    - 约定 reactive 的变量有 Ref 后缀，即 stateRef
    - 通知 ref 也可能是一个 dom 元素，即约定 RefEl 后缀

[Vue Composition API 陷阱](https://mp.weixin.qq.com/s/IBmlCYOQZ4tkg5V25HE0qw)

[Composition讨论页](https://composition-api.vuejs.org/zh/#%E5%BC%8A%E7%AB%AF)

4. getList 简单封装

```js
import { isRef, toRefs, reactive, onMounted} from 'vue'

export default (options) => {
  const { url, manual = false, params = {} } = options

  const state = reactive({
    data: {},
    error: false,
    loading: false,
  })

  const run = async () => {
    // 拼接查问参数
    let query = ''
    Object.keys(params).forEach(key => {
      const val = params[key]
      // 如果去 ref 对象，须要取 .value 属性
      const value = isRef(val) ? val.value : val
      query += `${key}=${value}&`
    })
    state.error = false
    state.loading = true
    try {
      const result = await fetch(`${url}?${query}`)
          .then(res => res.json())
      state.data = result
    } catch(e) {
      state.error = true
    }
    state.loading = false
  }

  onMounted(() => {
    // 第一次是否须要手动调用
    !manual && run()
  })

  return {
    run,
    ...toRefs(state)
  }
}


// 使用文件
import useRequest from './useRequest'

export default {
  setup() {
    const query = ref('vue')
    const { data, loading, error, run } = useRequest(
      {
        url: 'https://search',
        params: {
          query
        }
      }
    )
    return {
      data,
      query,
      error,
      loading,
      search: run,
    }
  }
}
```

## PS
[vue官方教程](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview)
[Vue官方教程笔记- 尤雨溪手写mini-vue](https://juejin.cn/post/6911897255087702030)

[awesome-vue-3](https://github.com/blacksonic/awesome-vue-3/blob/master/README.md)
