# 1

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 通过打包成 docker镜像 到服务器，服务直接 docker run 即可执行

### 通过 default.conf 修改 nginx 配置


### 将打包文件生成镜像
```
yarn db
```

### 将打包文件传到dockerhub
```
yarn dp
```

### 使用流式请求的时候，不能用axios，用fetch可以边传边播