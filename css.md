# css

+ [CSS 黑魔法小技巧，让你少写不必要的JS，代码更优雅(不是对ie的黑魔法=。=)](https://segmentfault.com/a/1190000011354975)
  + css的`content`属性`attr`抓取 `data-*` 的值
  + 表单校验`:valid(匹配的表单元素)`，`:invalid(不匹配的表单原素)`，`：required（伪类指定具有其属性的元素）`
  + `writing-mode` 文字垂直
  + `pointer-events：none` 禁止`html`元素`hover/focus/active`动态效果
  + 文字两端对齐`text-align-last:justify`
  + `:not()`去除不需要的属性
  + 苹果滚动优化
    <code>
    body{
    -webkit-overflow-scrolling: touch; /* ios5+ */
    }
    ele{
    overflow:auto;
    }
    </code>
  + 自定义`radio`,`checkbox`属性样式，`:checked`与`+`控制显隐，`for`属性锚定元素
  + 改变光标颜色`caret-color`
  + 图片黑白 `grayscale`，附链[CSS-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
  + 文字波浪线 height:background-size = 1 : 2
    <code>
    background: linear-gradient(135deg, transparent, transparent 45%, $color, transparent 55%, transparent 100%),

    linear-gradient(45deg, transparent, transparent 45%, $color, transparent 55%, transparent 100%);
    </code>