//  0 1 1 2 3 5 8，假设第 0 个是 0，第 1 个是 1，求第 n 个数的实现方式？
// f(n) = f(n-1) + f(n-2) n> 2
// f(2) = 1
// fn(1) = 0
function N(n) {
    if (n <= 0) {
        throw(new Error('请输入大于0的整数'))
    }
    if(n === 1) {
        return 0
    }
    if (n ===2) {
        return 1
    }
    let i = 3
    let n1 = 0
    let n2 = 1
    current = 0
    while( i <= n) {
        current = n1 + n2
        n1 = n2
        n2 = current
        i++
    }

    return n2
}

function f(n, a1 = 0, a2 = 1) {
    if (n <= 1) {return a1};
    return f(n-1, a2, a1 + a2);
}


// 简单实现一个发布订阅机制？

class EventEmitter {
    constructor() {
        this.list = new Map()
    }
    on(type, cb) {
        debugger
        if (this.list.has(type)) {
            console.log(this.list.get(type))
            let arr = this.list.get(type)
            arr.push(cb)
            // this.list.set(type, arr)
        } else {
            this.list.set(type, [cb])
        }
    }
    off(type, cb) {
        if (this.list.has(type)) {
            if (cb) {
                let arr = this.list.get(type) 
                let index = arr.findIndex(item => item === cb)
                index != -1 && (arr.splice(index, 1))
                // this.list.set(type, arr)
            } else {
                this.list.set(type, [])
            }
        } else {
            console.error(`type:${type}, 不存在！`)
        }
    }
    emit(type) {
        debugger
        if (this.list.has(type)) {
            let arr =this.list.get(type)
            arr.forEach(element => {
               element() 
            });
        } else {
            console.error(`type:${type}, 不存在！`)
        }
    }
}


// debounceImmediate
function debounceImmediate(fn, wait, immediate) {
    let timer = null
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        } else {
            immediate && fn.apply(context, args)
        }
        timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
        }, wait)
    }
}

// 插入排序
function checkArray(array) {
    if (!array || array.length <= 2) return TypeError('请输入数组')
}

function swap(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]]
}

function InsertSort(arr) {
    checkArray(arr)
    for(let i = 1; i< arr.length; i++) {
        for(let j = i -1; j>=0 && arr[j] > arr[j + 1]; j--) {
            swap(arr, j, j+1)
        }
    }
    return arr
}


let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined

function render(tmpl, data) {

    let reg = /\{\{(\w+)\}\}/
    if (reg.test(tmpl)) {
        const name = reg.exec(tmpl)[1]
        tmpl = tmpl.replace(reg, data[name])
        return render(tmpl, data)
    }
    return tmpl
}