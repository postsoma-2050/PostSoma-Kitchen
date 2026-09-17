# PostSoma Kitchen 图标系统

界面图标统一采用开源的 [Remix Icon](https://remixicon.com/) Vue 组件，并通过 `AppIcon.vue` 调用。业务组件不得新增 Emoji 充当按钮、状态或导航图标，也不得重复绘制已有的手写 SVG。

## 基础规则

- 默认使用 `Line` 版本，24×24 网格；常规按钮显示 16–18px，工具栏显示 18–20px，功能卡片显示 24–28px。
- 图标继承文字颜色，状态色由父级语义样式控制。选中态可以加强颜色，不混用多色 Emoji。
- 图标与文字并存时，图标为装饰并设置 `aria-hidden`；纯图标按钮必须在按钮上提供明确的 `aria-label`。
- 加载、成功、警告和错误使用固定语义：`loader`、`success`、`alert`、`error`。
- 食谱标题或原始资料中的食物 Emoji 属于内容数据，不作为界面控件图标；公共展示层可继续通过标题清洗器隐藏其装饰前缀。
- Matrix Flow 的 SVG 数据结构图形继续使用原生 SVG，因为它们属于可视化几何，而不是界面图标。

## 常用映射

| 场景 | `AppIcon` 名称 |
| --- | --- |
| 连续工序表 / 分支流程 | `table` / `branch` |
| 读图说明 / 操作明细 | `guide` / `steps` |
| 搜索 / 筛选 | `search` / `filter` |
| 全屏 / 导出 | `fullscreen` / `download` |
| 查看 / 编辑 / 删除 / 恢复 | `eye` / `edit` / `delete` / `back` |
| 成功 / 警告 / 错误 | `success` / `alert` / `error` |
| 复合配方 / 用量 | `bowl` / `scale` |

图标语义发生变化时先更新本规范和 `AppIconName`，避免同一图标在不同页面表达互相冲突的含义。
