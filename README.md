# 经销商APP

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目目录说明

```
plateform-app
│
├─build webpack配置目录
│
├─config 项目配置目录
│
├─src 项目源码
│  │
│  ├─assets 静态资源存放目录(图片)
│  │
│  ├─components 组件存放目录
│  │      │
│  │      └─ TimeLineItem 跟踪记录时间轴组件
│  │            ├─ index.vue 组件主文件
│  │            └─ index.less 组件样式文件
│  │
│  ├─contsants 常量池
│  │     ├─ style 样式常量池
│  │     │    └─default.less 默认全局样式
│  │     │
│  │     ├─ config.js 全局配置常量池
│  │     │
│  │     └─ outpath.js 接口路径常量池
│  │
│  ├─page 项目主文件目录
│  │   ├─ OwnerList 车主列表路由相关page
│  │   │      │
│  │   │      ├─ AddRecord.vue  添加跟踪记录主文件
│  │   │      ├─ AddRecord.less 添加跟踪记录样式文件
│  │   │      │
│  │   │      ├─ TrackingRecord.vue 跟踪记录时间轴主文件
│  │   │      └─ TrackingRecord.less 跟踪记录时间轴主样式文件
│  │   │
│  │   ├─ QuotationRecord 报价结果路由相关page 
│  │   │      │
│  │   │      ├─ QuotationResult.vue 报价结果主文件
│  │   │      ├─ QuotationRecord.less 报价结果样式文件 
│  │   │      │
│  │   │      ├─ QuoteFail.vue 报价失败主文件
│  │   │      ├─ QuoteFail.less 报价失败样式文件
│  │   │      │
│  │   │      ├─ QuoteSuccess.vue 报价成功主文件
│  │   │      ├─ QuoteSuccess.less 报价成功样式文件
│  │   │      │
│  │   │      ├─ QuoteSuccessDetail.vue 报价成功详情主文件
│  │   │      ├─ QuoteSuccessDetail.less 报价成功详情样式文件
│  │   │      │
│  │   │      ├─ ShareQuoteResult.vue 报价结果分享主文件
│  │   │      └─ ShareQuoteResult.less 报价结果分享样式文件
│  │   │  
│  │   └─ Quote 报价流程路由相关page  
│  │          │
│  │          ├─ AddUser.vue 完善车主信息主文件
│  │          ├─ AddUser.less 完善车主信息样式文件
│  │          │
│  │          ├─ CheckCar.vue 车型校验主文件
│  │          ├─ CheckCar.less 车型校验样式文件
│  │          │
│  │          ├─ ChooseInsurance.vue 险种选择主文件
│  │          ├─ ChooseInsurance.less 险种选择样式文件
│  │          │
│  │          ├─ Contacts.vue 联系人信息主文件
│  │          ├─ Contacts.less 联系人信息样式文件
│  │          │
│  │          ├─ QueryDetails.vue 车辆详情主文件
│  │          ├─ QueryDetails.less 车辆详情样式文件
│  │          │
│  │          ├─ QuoteComp.vue 选择报价保险公司主文件
│  │          └─ QuoteComp.less  选择报价保险公司样式文件
│  │
│  ├─services 通用fetch请求方法
│  │  │
│  │  └─index.js  fetch 请求主文件
│  │
│  └─utils 通用工具目录
│     │
│     ├─ lib 通用工具库文件
│     │   └─vconsole.min.js 移动端控制台（可在全局配置常量池中修改needVConsole变量 true需要 false不需要）
│     │
│     └─index.js 通用方法集合
│ 
├─App.vue 项目根文件
├─App.less 项目根文件样式
│
├─routes.js 路由文件
│
└─main.js 项目根脚本文件

```
