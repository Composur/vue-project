
# client
[![GitHub open issues](https://img.shields.io/github/issues/undefined/client.svg?maxAge=2592000)](https://github.com/undefined/client/issues)
[![Npm version](https://img.shields.io/npm/v/client.svg?maxAge=2592000)](https://www.npmjs.com/package/client)

## Usage
```HTML
<Client :text="hello"></Client>
```
```javascript
import { Client } from 'client'

export default {
  components: {
    Client
  }
}
```
## API

## Installation
```
npm install client
```

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

### server/src
|文件目录 |含义 |
| ----- | ------  |
| api | 请求接口相关  |
| assets | 公用资源  |
| mock | 模拟数据  |
| components | 公共组件（非路由组件）  |
| pages | 路由组件  |
| store | vuex 相关  |
| vue.config | 覆盖 vue-cli 配置文件  |
| App.vue | 应用根模块  |
| main.js| 应用入口  |

### Update the API section of README.md with generated documentation
```
yarn run doc:build
```
