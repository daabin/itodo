# STEP-3 设计数据模型，引入组件库，完成页面搭建

## 设计数据模型

```
// 任务 scheme 
{
  id: number, // 自增 id
  title: string, // 任务描述
  completed: bool, // 是否已完成
  deadline: number, // 任务截止时间 毫秒时间戳
  completedAt: number, // 完成时间  毫秒时间戳
}

// 任务列表
const TodoList = {
  "data": [
    {
      "title": "周六早晨慢跑10KM @张三",
      "completed": false,
      "deadline": 1655519703000,
      "completedAt": null,
      "id": 6
    },
    {
      "title": "周五晚上到图书馆继续看操作系统概论",
      "completed": false,
      "deadline": 1655455116000,
      "completedAt": null,
      "id": 7
    },
    {
      "title": "约高中同学到北亭聚一下",
      "completed": true,
      "deadline": 1655001363000,
      "completedAt": 1655174168517,
      "id": 8
    }
  ],
  "offset": 0,
  "limit": 10,
  "total": 5
}
```

## 引入依赖

- 组件库 `@douyinfe/semi-ui`

- 时间处理工具函数 `dayjs`

- HTTP 请求库 `axios`

- 发布订阅库 `pubsub-js`

```
npm i @douyinfe/semi-ui dayjs pubsub-js axios
```