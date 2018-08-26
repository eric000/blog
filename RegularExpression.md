# 正则表达式 <small>[学习链接] (http://www.cnblogs.com/deerchao/archive/2006/08/24/zhengzhe30fengzhongjiaocheng.html) 2017-11-09</small>

## 常用元字符
+ `\b`   匹配单词分界线处,开始or结束
+ `. `   匹配除了换行符以外的任意字符
+ `\d `  匹配一个数字[0-9]
  * `\d{num}` 匹配num个数字
+ `\s`   匹配任意的空白符
+ `\w`   匹配 字母 || 数字|| 下划线 || 汉字        ,不算汉语的话相当于[a-z0-9A-Z_]
+ `^`    匹配字符串开始
+ `$`    匹配字符串结束

## 字符转义
如果要搜索元字符本身，那么 `\`可以取消字符特殊意义 ，例如 `\\`->`\`

## 重复
+ `*`    匹配任意数量(包括0次)
  *  `.*`   匹配任意字符 && 任意数量 && !indexOf('/n')
+ `+`    匹配任意数量(不包括0次)
+ `?`    匹配出现 0 || 1次
+ `{n}`  重复 n 次
  * `{n,}` 匹配 n次 || 更多
  * `{n,m}` 匹配 n ~ m 次

## 分支条件
从左到右执行，逻辑类似 `||`

## 反义 (通常大写即反义)

* `\W`  匹配  !字母 && !数字 && !下划线 && !汉字 
* `\S`  匹配不是空白符的字符 
  + 空白符是指空格符' '、水平制表符'\t'、垂直制表符'\v'、换行符'\n'、回车符'\r'之类的字符 
* `\D`  匹配 !NUMBER 
* `\B`  匹配 不是单词开头或者结尾的位置 
* `[^x]` 匹配除了 x 外的任意字符 
* `[^aeiou]` 匹配除了aeiou 意外的任意字符 

## 方向引用 <small>重复搜索签名某个分组匹配的文本</small>

<table cellspacing="0"><caption>常用分组语法</caption>
<tbody>
<tr><th scope="col">分类</th><th scope="col">代码/语法</th><th scope="col">说明</th></tr>
<tr><th rowspan="3">捕获</th>
<td><span class="code">(exp)</span></td>
<td><span class="desc">匹配exp,并捕获文本到自动命名的组里</span></td>
</tr>
<tr>
<td><span class="code">(?&lt;name&gt;exp)</span></td>
<td><span class="desc">匹配exp,并捕获文本到名称为name的组里，也可以写成(?'name'exp)</span></td>
</tr>
<tr>
<td><span class="code">(?:exp)</span></td>
<td><span class="desc">匹配exp,不捕获匹配的文本，也不给此分组分配组号</span></td>
</tr>
<tr><th rowspan="4">零宽断言</th>
<td><span class="code">(?=exp)</span></td>
<td><span class="desc">匹配exp前面的位置,也叫零宽度正预测先行断言</span></td>
</tr>
<tr>
<td><span class="code">(?&lt;=exp)</span></td>
<td><span class="desc">匹配exp后面的位置,也叫零宽度正回顾后发断言</span></td>
</tr>
<tr>
<td><span class="code">(?!exp)</span></td>
<td><span class="desc">匹配后面跟的不是exp的位置</span></td>
</tr>
<tr>
<td><span class="code">(?&lt;!exp)</span></td>
<td><span class="desc">匹配前面不是exp的位置</span></td>
</tr>
<tr><th>注释</th>
<td><span class="code">(?#comment)</span></td>
<td><span class="desc">这种类型的分组不对正则表达式的处理产生任何影响，用于提供注释让人阅读</span></td>
</tr>
</tbody>
</table>

## 注释
(?#content)   等价于 /* content *s/

## 贪婪与懒惰
* 贪婪：`a.*b` 匹配最 长 的以 a 开始， 以 b 结束的字符 
* 懒惰：`a.*?b` 匹配最 短 的以 a 开始， 以 b 结束的字符 

<small>备注懒惰限定符</small>

|代码 |说明|
|:---|:---|
|`*?`|重复 n 次，less重复|
|`+?`|重复 `1 || n` ，less重复|
|`??`|重复`0 || 1`，less重复 |
|`{n,m}?`|重复 n 到 m 次，less重复|
|`{n,}?`| 重复n次以上，less重复|


## Final
<table cellspacing="0"><caption>尚未详细讨论的语法</caption>
<thead>
<tr><th scope="col">代码/语法</th><th scope="col">说明</th></tr>
</thead>
<tbody>
<tr>
<td><span class="code">\a</span></td>
<td><span class="desc">报警字符(打印它的效果是电脑嘀一声)</span></td>
</tr>
<tr>
<td><span class="code">\b</span></td>
<td><span class="desc">通常是单词分界位置，但如果在字符类里使用代表退格</span></td>
</tr>
<tr>
<td><span class="code">\t</span></td>
<td><span class="desc">制表符，Tab</span></td>
</tr>
<tr>
<td><span class="code">\r</span></td>
<td><span class="desc">回车</span></td>
</tr>
<tr>
<td><span class="code">\v</span></td>
<td><span class="desc">竖向制表符</span></td>
</tr>
<tr>
<td><span class="code">\f</span></td>
<td><span class="desc">换页符</span></td>
</tr>
<tr>
<td><span class="code">\n</span></td>
<td><span class="desc">换行符</span></td>
</tr>
<tr>
<td><span class="code">\e</span></td>
<td><span class="desc">Escape</span></td>
</tr>
<tr>
<td><span class="code">\0nn</span></td>
<td><span class="desc">ASCII代码中八进制代码为nn的字符</span></td>
</tr>
<tr>
<td><span class="code">\xnn</span></td>
<td><span class="desc">ASCII代码中十六进制代码为nn的字符</span></td>
</tr>
<tr>
<td><span class="code">\unnnn</span></td>
<td><span class="desc">Unicode代码中十六进制代码为nnnn的字符</span></td>
</tr>
<tr>
<td><span class="code">\cN</span></td>
<td><span class="desc">ASCII控制字符。比如\cC代表Ctrl+C</span></td>
</tr>
<tr>
<td><span class="code">\A</span></td>
<td><span class="desc">字符串开头(类似^，但不受处理多行选项的影响)</span></td>
</tr>
<tr>
<td><span class="code">\Z</span></td>
<td><span class="desc">字符串结尾或行尾(不受处理多行选项的影响)</span></td>
</tr>
<tr>
<td><span class="code">\z</span></td>
<td><span class="desc">字符串结尾(类似$，但不受处理多行选项的影响)</span></td>
</tr>
<tr>
<td><span class="code">\G</span></td>
<td><span class="desc">当前搜索的开头</span></td>
</tr>
<tr>
<td><span class="code">\p{name}</span></td>
<td><span class="desc">Unicode中命名为name的字符类，例如\p{IsGreek}</span></td>
</tr>
<tr>
<td><span class="code">(?&gt;exp)</span></td>
<td><span class="desc">贪婪子表达式</span></td>
</tr>
<tr>
<td><span class="code">(?&lt;x&gt;-&lt;y&gt;exp)</span></td>
<td><span class="desc">平衡组</span></td>
</tr>
<tr>
<td><span class="code">(?im-nsx:exp)</span></td>
<td><span class="desc">在子表达式exp中改变处理选项</span></td>
</tr>
<tr>
<td><span class="code">(?im-nsx)</span></td>
<td><span class="desc">为表达式后面的部分改变处理选项</span></td>
</tr>
<tr>
<td><span class="code">(?(exp)yes|no)</span></td>
<td><span class="desc">把exp当作零宽正向先行断言，如果在这个位置能匹配，使用yes作为此组的表达式；否则使用no</span></td>
</tr>
<tr>
<td><span class="code">(?(exp)yes)</span></td>
<td><span class="desc">同上，只是使用空表达式作为no</span></td>
</tr>
<tr>
<td><span class="code">(?(name)yes|no)</span></td>
<td><span class="desc">如果命名为name的组捕获到了内容，使用yes作为表达式；否则使用no</span></td>
</tr>
<tr>
<td><span class="code">(?(name)yes)</span></td>
<td><span class="desc">同上，只是使用空表达式作为no</span></td>
</tr>
</tbody>
</table>

