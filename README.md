## TodoList Example

本项目为开发 [OpenSumi](https://github.com/opensumi/core) 模块的演示案例。

![preview](https://img.alicdn.com/imgextra/i2/O1CN01IXXMCy2563jAC4FDO_!!6000000007476-2-tps-2452-1640.png)

### 项目结构
```bash
.
└── workspace                   # 工作目录
├── modules                     # 存放模块目录
├── extensions                  # 插件目录
├── src
│   ├── browser
│   ├── common
│   └── node
├── tsconfig.json
├── webpack.browser.config.js
├── webpack.ext-host.config.js
├── webpack.node.config.js
├── webpack.worker-host.config.js
├── package.json
└── README.md
```

### 启动

```bash
$ git clone git@github.com:opensumi/todo-list-sample.git
$ cd todo-list
$ yarn				# 安装依赖
$ yarn start			    # 并行启动前端和后端
```

浏览器打开 http://127.0.0.1:8080
