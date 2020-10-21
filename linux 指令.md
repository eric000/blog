# linux 指令

## shell =  命令行界面

### 前置了解
- man, （manual缩写）手册页， 如`man touch`
- `which` 在PATH变量路径中， 搜索某个命令的位置

### 路径
- linux对文件进行树状抽象。`/`代表根，每级目录用`/`分开
- 路径，绝对路径（完全路径）和相对路径
- 工作目录，打开时自动产生。相对路径是以工作目录为基点
    - `cd` 切换工作目录
    - `.` 当前目录，如 `cd .` 无改变， `cd ..`返回上级目录
    - `pwd`，（print working directory缩写） 查看当前目录
### 常见文件类型

- 普通文件，目录文件， 可执行文件， 管道文件， socket文件， 软连接文件， 硬链接文件
- `ls`, (list缩写) 显示目标列表， 如`ls -F`显示当前目录下文件和他的类型, `ls -l`显示文件的长格式列表
-
    | 符号结尾| 含义|
    |-|--|
    |*|可执行文件|
    |=|Socket文件|
    |@|软连接|
    |`|`|管道文件|
    |(none)|普通文件|
    |/|目录|
- `touch` 一是用于把已存在文件的时间标签更新为系统当前的时间（默认方式）；二是用来创建新的空文件
- `rm`,（remove缩写） 删除一个文件或者目录
- nano、vi 修改文件的编辑器 
- `cat`, (concatenate缩写)， 把内容写入标准输出流文件。大文件慎用
- `more` 类似cat，不过是逐页阅读
- `less` 类似more，支持向上翻页
- `head` 和 `tail` 读取文件头/尾 N行
- `grep`, `[g(lobal) re(gular expression) p(attern)]缩写` 通过正则表带是全局搜索 
- `find` 在文件系统查找文件
### 进程
- `ps`, (process status缩写) 显示当前进程的状态(进程快照)，如`ps -ef`,`ps aux`

    |符号|含义|
    |--|--|
    |UID|进程所有者|
    |PID|进程唯一标识|
    |PPID|进程的父进程ID|
    |C|CPU利用率|
    |STIME|开始时间|
    |TTY|进程所在TTY|
    |TIME|执行的时间|
    |CMD|进程启动时的命令（`[]`系统/内核进程）|

- `top` 实时进程数据

### 管道
- 输入输出
- 重定向
    - `>`覆盖重定向;`>>`追加重定向
- 先进先出
- 管道作用
    - 命名管道 由mkfifo创建，有路径
    - 匿名管道： 本地父子进程之间通信
- `xargs` 将标准输入转为命令行参数

### 权限

- Linux 中一个文件可以设置 3 种权限
    - 读权限（r）：控制读取文件。
    - 写权限（w）：控制写入文件。
    - 执行权限（x）：控制将文件执行，比如脚本、应用程序等。
- 3个维度，第一组是用户权限，第二组是组权限，第三组是所有用户的权限。
    - 用户维度。每个文件可以所属 1 个用户，用户维度配置的 rwx 在用户维度生效；
    - 组维度。每个文件可以所属 1 个分组，组维度配置的 rwx 在组维度生效；
    - 全部用户维度。设置对所有用户的权限
- 遵循最小权限原则， 权限包围
- `groups` 查看用户所在组的组成员
- `id` 显示当前用户信息
    - uid 是用户 id
    - gid 是组 id
    - groups 后面是每个分组和分组的 id
- `useradd` 创建用户
- `groupadd` 创建分组
- `usermod` 添加次级分组
- `usermod` 修改用户组要分组
- `chmod`  (change file mode bits缩写）修改文件权限
- `chown` 修改文件所属用户

### 网络
- 远程
    - `ssh`,（Secure Shell） 远程登陆， 如`ssh user@ip`
    - `scp`, 拷贝到远程，`~`本地缩写
- 网络状态
    - `ifconfig`, 查看本地ip和网络接口
    - `netstat`, 查看当前网络使用情况， 如`netstat | wc -l` 查询有多少个socket，`netstat -t`查看TCP连接， 
- 网络测试
    - `ping` 测试网络延迟
    - `telnet` 测试某ip+端口是否通畅
- DNS 查询
    - `host` DNS 查询
    - `dig` 类似host，但更详细
- HTTP 
    - `curl` (CommandLine Uniform Resource Locator) 文件传输，可请求网址、获取资源，如`curl -I` 查询请求的HTTP 响应头

## 包管理

主流的包就是 rpm（redhatpackage manager）和 dpkg（debian package）

自动依赖管理 yum 和 apt

#### 一个简单的安装经过
- 安装`wget`,下载 `nginx`
- 解压`tar -xzvf nginx-***.tar.gz`, 

    - -x代表 extract（提取）。
    - -z代表gzip，也就是解压gz类型的文件。
    - -v代表 verbose（显示细节），如果你不输入-v，就不会打印解压过程了。
    - -f代表 file，这里指的是要操作文件，而不是磁带。 所以tar解压通常带有x和f，打包通常是c就是 create 的意思
- 配置和解决依赖 ，`cd` 进入文件夹， `./configure --help` 看到所有的配置项，默认的话直接执行 `./configure`。安装gcc通常是安装build-essential这个包等。。。
- 编译和安装`make && sudo make install` 
- 需要全局使用的话，软连接到 `/usr/local/bin`
