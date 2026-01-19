# 工作生活双模式 TodoList - 完整需求文档 v3.0

---

## 一、产品定位

一个**有趣、简洁、有温度的工作生活双模式智能待办工具**，专为忙碌的展馆策展人设计。

**核心价值**：
- 快速记录（语音+AI拆解）
- 工作生活分离
- 每日总结有趣（带昵称，手写信风格）
- 减少心理负担
- 自动备份，不丢失数据

**目标用户**：
- 展馆多媒体导演/策展人
- 同时管理多个大展馆项目
- 任务多且紧密，容易顾此失彼
- 没有时间系统化做todolist

---

## 二、核心痛点与解决方案

### 痛点分析

| 痛点 | 具体表现 | 解决方案 |
|------|----------|----------|
| **任务多且紧密** | 每天要做的事情很多 | 语音快速输入 + AI自动拆解 |
| **多项目并行** | 同时跟进3-8个展馆，容易遗漏 | 按展馆分组，一目了然 |
| **没时间做todolist** | 工作忙，没时间整理 | 极简操作，3秒完成记录 |
| **容易顾此失彼** | 多个项目穿插进行 | 每日弹窗提醒，任务延续管理 |
| **生活没规律** | 想做的健康小事总是忘记 | 18个默认标签 + AI推荐，每日打卡 |
| **缺乏成就感** | 完成任务没有正向反馈 | 每日总结 + 生活夸夸，带昵称有温度 |

---

## 三、功能模块总览

```
┌───────────────────────────────────────────┐
│  工作生活双模式 TodoList             │
├───────────────────────────────────────────┤
│  1. 昵称系统（首次使用）         │
│  2. 工作模式                       │
│     • 语音/文字输入 + AI拆解       │
│     • 大任务/小任务分类             │
│     • 按展馆分组展示               │
│     • 早晨/晚上弹窗提醒（仅一次）   │
│  3. 生活模式                       │
│     • 18个默认标签（健康+学习+休闲）│
│     • AI推荐6个趣味标签（可刷新）    │
│     • 每日刷新（不延续）           │
│  4. 总结模式                       │
│     • 工作总结（带昵称）           │
│     • 生活夸夸（带昵称）           │
│     • 手写字体风格                  │
│  5. 数据管理                       │
│     • 自动备份工作记录             │
│     • 手动清除旧工作               │
│     • 查看备份历史                 │
└───────────────────────────────────────────┘
```

---

## 四、详细功能需求

### 4.1 昵称系统

#### 4.1.1 首次使用 - 设置昵称

**场景**：用户第一次打开应用

**弹窗设计**：
```
┌─────────────────────────────┐
│  👋 欢迎使用！            │
├─────────────────────────────┤
│  请告诉我你的昵称：        │
│                           │
│  [________________]       │
│                           │
│  💡 例如：小王、策展人阿杰  │
│                           │
│  [开始使用]                │
└─────────────────────────────┘
```

**功能要求**：
- 用户输入昵称（必填，2-10个字）
- 保存到 localStorage 和数据库
- 所有后续界面都使用昵称称呼

#### 4.1.2 修改昵称

**入口**：设置按钮 ⚙️（右上角）

**弹窗设计**：
```
┌─────────────────────────────┐
│  ✏️ 修改昵称             │
├─────────────────────────────┤
│  当前昵称：小王           │
│                           │
│  新昵称：[____________]   │
│                           │
│  2-10个字符               │
│                           │
│  [保存] [取消]            │
└─────────────────────────────┘
```

#### 4.1.3 昵称使用场景

**所有界面都使用昵称**：

| 场景 | 文字示例 |
|------|----------|
| 工作总结标题 | "💼 小王，今日工作总结" |
| 生活夸夸标题 | "🌸 小王，今日生活夸夸" |
| 早晨弹窗 | "📅 小王，今日任务确认" |
| 晚上弹窗 | "🌙 小王，下班时间到了" |
| 总结内容 | "亲爱的小王，今天你完成了..." |
| 夸夸内容 | "小王，你是最棒的！" |

---

### 4.2 工作模式

#### 4.2.1 任务输入

**界面设计**：
```
┌─────────────────────────────────┐
│  [输入任务.............] [🎤]│
│  提示：说出任务，AI自动拆解  │
└─────────────────────────────────┘
```

**功能要求**：
- 文字输入框（支持多行）
- 语音输入按钮（点击录音，转文字）
- 回车或点击"提交"发送
- 提交后清空输入框

#### 4.2.2 AI智能拆解

**AI自动提取**：
- 大任务/小任务：需要用户确认
- 展馆名称：科技馆/美术馆/博物馆等
- 对接人：李供应商/张技术等
- 截止时间：今天/明天/下周

**输入示例**：
```
"科技馆今天要和李供应商确认3D模型"
```

**AI分析返回**：
```json
{
  "taskTitle": "确认3D模型",
  "projectName": "科技馆",
  "contactPerson": "李供应商",
  "targetDate": "今天",
  "type": "大任务",
  "subTasks": [
    { "title": "联系李供应商", "contact": "李供应商" },
    { "title": "确认文件完整性", "contact": "李供应商" }
  ]
}
```

**系统询问**：
```
小王，这是一个大任务还是小任务？
[大任务] [小任务]
```

#### 4.2.3 任务展示

**界面设计**：
```
┌─────────────────────────────────┐
│  📍 科技馆 (2个进行中)     │
├─────────────────────────────────┤
│                           │
│  📦 大任务：3D模型资料交付 │
│     ✓ 已收到文件 - 李供应商 │
│     ⚪ 确认文件完整性 - 张技术 │
│     🟡 转交给技术审核 - 张技术 │
│                           │
│  📝 小任务：催资料         │
│     ⚪ 给李供应商打电话     │
│                           │
│  📍 美术馆 (1个进行中)     │
├─────────────────────────────────┤
│  📦 大任务：音响设备对接   │
│     ⚪ 联系赵音响 - 赵音响 │
│                           │
└─────────────────────────────────┘
```

**功能要求**：
- 按展馆分组展示
- 大任务和小任务分别显示
- 子任务显示：一句话说明 + 对接人 + 状态
- 状态图标：⚪ 待对接 / 🟡 已对接 / ✓ 已完成
- 完成后变灰 + 删除线
- 点击勾选框完成

#### 4.2.4 早晨弹窗（仅第一次打开）

**触发条件**：
- 每天第一次打开应用
- 有昨天未完成的任务
- 使用 localStorage 记录今天是否已弹窗

**弹窗设计**：
```
┌─────────────────────────────┐
│  📅 小王，今日任务确认    │
├─────────────────────────────┤
│  昨天的任务：             │
│  ✓ 美术馆-音响设备      │
│  ⚪ 科技馆-3D模型        │
│                           │
│  要延续这些任务吗？       │
│  [延续] [已完成]          │
│                           │
│  💡 如果不选择，         │
│     将自动沿用昨天的清单  │
│                           │
│  [开始今日工作]            │
└─────────────────────────────┘
```

**默认沿用逻辑**：
- 用户点击[开始今日工作]但未选择延续/已完成
- 10秒后自动将昨天所有未完成任务复制到今天
- 延续的任务标记为"已延续"

#### 4.2.5 晚上弹窗（仅第一次打开）

**触发条件**：
- 晚上21:00后第一次打开应用
- 有今天未完成的任务

**弹窗设计**：
```
┌─────────────────────────────┐
│  🌙 小王，下班时间到了    │
├─────────────────────────────┤
│  今天的工作都完成了吗？     │
│                           │
│  今日未完成任务：           │
│  ⚪ 科技馆-3D模型        │
│  ⚪ 美术馆-音响设备      │
│                           │
│  [一键全选完成]           │
│  [确认当前进度]            │
└─────────────────────────────┘
```

#### 4.2.6 任务延续逻辑

**工作任务延续**：
- ✅ 大任务可以延续（直接复制一份）
- ✅ 小任务也可以延续（直接复制一份）
- 延续时保留原有的子任务结构
- 标记为"已延续"，显示图标 🔁

**实现逻辑**：
```typescript
// 延续任务
const continueTask = async (task) => {
  await db.workTask.create({
    title: task.title,
    type: task.type,
    projectName: task.projectName,
    contactPerson: task.contactPerson,
    targetDate: new Date(), // 今天
    isContinued: true, // 标记为延续
    subTasks: {
      create: task.subTasks.map(st => ({
        title: st.title,
        contact: st.contact,
      }))
    }
  })
}
```

---

### 4.3 生活模式

#### 4.3.1 默认生活标签（18个）

**分类展示**：

**健康类（6个）**：
```
☀️ 眼保健操 (2次)
💧 补充水分 (8杯)
🚶‍♂️ 散步 (30分钟)
🧘 深呼吸 (10次)
🥗 健康饮食 (1顿)
😴 早睡早起
```

**学习类（6个）**：
```
📚 阅读 (30分钟)
🎵 听音乐 (放松)
📝 写日记
🎨 画画/涂鸦
🧩 学习新技能
🎥 看纪录片
```

**休闲类（6个）**：
```
📞 和朋友打个电话
🐱 和宠物玩耍
🎮 玩小游戏 (20分钟)
☕ 喝杯茶放松
🌸 闻一闻花香
📸 拍一张生活照
```

#### 4.3.2 AI推荐标签（6个）

**界面设计**：
```
┌─────────────────────────────┐
│  ✨ AI推荐趣味生活小任务   │
├─────────────────────────────┤
│  [刷新]  🔄              │
│                           │
│  🧘 给自己一个拥抱        │
│  🎤 哼一首喜欢的歌       │
│  🌻 看看窗外的树         │
│  🤭 对着镜子微笑10秒     │
│  ✍️ 写下今天的一件好事   │
│  🌙 晚上做5分钟冥想     │
│                           │
│  [全部添加到今日清单]     │
└─────────────────────────────┘
```

**AI提示词**：
```
生成6个有趣、温暖的生活小任务，用于每日打卡。

要求：
1. 每个任务1-2句话，简单易做
2. 每个任务配一个表情图标
3. 分类包括：健康、学习、休闲
4. 要有温度，让人看了就想做
5. 随机性，每次生成不同的内容

返回JSON格式：
{
  "tags": [
    { "name": "任务名称", "icon": "表情", "category": "分类" }
  ]
}
```

**功能要求**：
- AI随机生成6个趣味生活小任务
- 点击[刷新]重新生成（无限刷新）
- 可以选择全部添加或单独添加
- 添加后进入今日生活标签列表

#### 4.3.3 生活标签特点

- ✅ 默认18个：健康6个 + 学习6个 + 休闲6个
- ✅ AI推荐6个：随机生成趣味任务
- ✅ 每日刷新：不延续，每天都是新的开始
- ✅ 勾选完成：完成后变灰+删除线
- ✅ 开始新的一天：自动清空所有生活任务
- ✅ 不延续到第二天

#### 4.3.4 生活任务进度展示

**界面设计**：
```
┌─────────────────────────────┐
│  ☀️ 眼保健操 (2次)        │
│  ✓ 第1次 ✓ 第2次        │
│                           │
│  💧 补充水分 (8杯)        │
│  ✓ 第1杯 ✓ 第2杯 ✓ 第3杯 │
│  ⚪ 第4杯                 │
│  ...                       │
│                           │
│  [完成今日生活]            │
└─────────────────────────────┘
```

---

### 4.4 总结模式

#### 4.4.1 进入总结

用户在"工作模式"或"生活模式"点击"完成今日任务"后进入。

#### 4.4.2 工作总结卡片（手写信风格）

**界面设计**：
```
┌─────────────────────────────┐
│  ┌───────────────────┐   │
│  │ 💼              │   │
│  │ 工作总结         │   │
│  └───────────────────┘   │
│                           │
│  亲爱的小王：             │
│                           │
│  今天你完成了 3 个大任务   │
│  和 5 个小任务            │
│                           │
│  📍 科技馆                │
│     • 3D模型确认 ✓       │
│     • 展柜尺寸确认 ✓     │
│                           │
│  📍 美术馆                │
│     • 音响设备对接 ✓      │
│                           │
│  小王，今天超高效！        │
│  你真的很棒！💪           │
│                           │
│  —— 来自你的AI助手         │
└─────────────────────────────┘
```

**字体样式**：
```css
.handwritten {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.1rem;
  line-height: 1.8;
  letter-spacing: 0.05em;
  color: #333;
}
```

#### 4.4.3 生活夸夸卡片（手写信风格）

**界面设计**：
```
┌─────────────────────────────┐
│  ┌───────────────────┐   │
│  │ 🌸              │   │
│  │ 生活夸夸         │   │
│  └───────────────────┘   │
│                           │
│  亲爱的小王：             │
│                           │
│  今天你好好爱自己了！     │
│                           │
│  💧 喝了6杯水，          │
│     皮肤棒棒💧            │
│                           │
│  ☀️ 做了2次眼保健操，    │
│     眼睛好舒服✨           │
│                           │
│  🚶‍♂️ 散步30分钟，         │
│     身心放松🌸             │
│                           │
│  小王，你是最棒的！        │
│  明天继续加油💖           │
│                           │
│  —— 来自你的AI助手         │
└─────────────────────────────┘
```

#### 4.4.4 总结功能按钮

**界面设计**：
```
┌─────────────────────────────┐
│                           │
│  [分享文本 ✉️]           │
│  生成手写字体风格的文本   │
│                           │
│  [复制文字 📋]           │
│  复制到剪贴板，           │
│  方便发朋友圈/微信        │
│                           │
│  [保存图片 📸]           │
│  保存为图片（可选）       │
│                           │
│  [开始新的一天 🌅]       │
└─────────────────────────────┘
```

**分享文本内容**：
```
亲爱的朋友们：

今天我完成了3个大任务和5个小工作！
💼 科技馆：3D模型确认 ✓、展柜尺寸确认 ✓
💼 美术馆：音响设备对接 ✓

生活上也好好爱自己了！
🌸 喝了6杯水、做了2次眼保健操、散步30分钟

你们今天过得怎么样？😊

—— 来自小王的工作生活打卡
```

---

### 4.5 数据管理

#### 4.5.1 开始新的一天

**触发时机**：在总结界面点击"开始新的一天"

**界面设计**：
```
┌─────────────────────────────┐
│  📦 开始新的一天          │
├─────────────────────────────┤
│                           │
│  ✅ 清空所有生活任务       │
│                           │
│  ✅ 保留工作任务           │
│     （需手动清除）         │
│                           │
│  ✅ 自动备份工作记录到本地│
│     文件名：               │
│     工作_2024-01-15_小王.json│
│                           │
│  [确定开始] [取消]         │
└─────────────────────────────┘
```

**操作逻辑**：
1. 自动清空所有生活任务
2. 工作任务保留（不自动清除）
3. 自动备份工作记录到本地
4. 弹出"今日任务确认"
5. 询问昨日任务是否延续

#### 4.5.2 手动清除所有旧的工作

**入口**：设置页面

**界面设计**：
```
┌─────────────────────────────┐
│  🗑️ 清除所有旧的工作      │
├─────────────────────────────┤
│  确定要清除所有工作记录？ │
│                           │
│  清除前会自动备份到本地   │
│  📦 文件名：             │
│     工作_2024-01-15_小王.json│
│                           │
│  💡 备份数据包括：         │
│     • 所有工作任务           │
│     • 所有子任务             │
│     • 完成状态             │
│                           │
│  [取消] [清除并备份]       │
└─────────────────────────────┘
```

**操作逻辑**：
1. 弹出确认对话框
2. 自动备份工作记录到本地
3. 确认后清空所有工作任务
4. 可以查看备份记录

#### 4.5.3 备份记录管理

**入口**：设置页面

**界面设计**：
```
┌─────────────────────────────┐
│  📦 工作备份记录         │
├─────────────────────────────┤
│                           │
│  最近备份：               │
│  • 2024-01-15 (3个任务)  │
│  • 2024-01-14 (5个任务)  │
│  • 2024-01-13 (2个任务)  │
│                           │
│  [查看备份] [清除过期]     │
└─────────────────────────────┘
```

---

## 五、数据模型

### 5.1 用户配置表

```prisma
model UserConfig {
  id          String   @id @default(cuid())
  nickname    String   @unique // 用户昵称（2-10个字符）
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 5.2 工作任务表

```prisma
model WorkTask {
  id            String   @id @default(cuid())
  title         String   // 任务标题
  type          String   // "大任务" 或 "小任务"
  projectName   String   // 展馆名称：科技馆/美术馆/博物馆等
  contactPerson  String?  // 对接人
  targetDate    DateTime // 目标日期
  isCompleted   Boolean  @default(false)
  isContinued  Boolean  @default(false) // 是否从昨天延续
  date          DateTime @default(now()) // 记录日期
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  subTasks      WorkSubTask[]
}

model WorkSubTask {
  id          String   @id @default(cuid())
  taskId      String
  task        WorkTask @relation(fields: [taskId], references: [id])
  title       String   // 子任务标题
  contact     String?  // 对接人
  status      String   // "待对接" 或 "已对接"
  isCompleted Boolean  @default(false)
  order       Int      // 排序
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 5.3 生活标签表

```prisma
model LifeTag {
  id            String   @id @default(cuid())
  name          String   // 标签名称
  icon          String   // 表情图标
  category      String   // 分类：健康/学习/休闲/AI推荐
  targetCount   Int      // 目标次数（如8杯水、2次眼保健操）
  completedCount Int     @default(0) // 已完成次数
  isCompleted   Boolean  @default(false)
  isCustom      Boolean  @default(false) // 是否为AI推荐
  date          DateTime @default(now()) // 记录日期
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### 5.4 每日总结表

```prisma
model DailySummary {
  id                  String   @id @default(cuid())
  nickname            String   // 用户昵称
  date                DateTime @default(now())

  // 工作总结
  workBigTaskCompleted   Int      @default(0)
  workSmallTaskCompleted Int     @default(0)
  workSummary         String?  // 工作总结文本（手写信风格）

  // 生活总结
  lifeTagsCompleted   Int      @default(0)
  lifeSummary        String?  // 生活总结文本（手写信风格）

  createdAt           DateTime @default(now())
}
```

### 5.5 备份表

```prisma
model WorkBackup {
  id          String   @id @default(cuid())
  nickname    String   // 用户昵称
  backupDate  DateTime @default(now())
  taskCount   Int      // 备份的任务数量
  data        String   // 备份的JSON数据
  createdAt   DateTime @default(now())
}
```

---

## 六、AI逻辑

### 6.1 工作任务拆解

**LLM提示词**：
```
分析用户的输入，提取项目、任务标题、子任务。

输入：${input}

返回JSON格式：
{
  "taskTitle": "大任务标题（简洁）",
  "projectName": "项目名称（科技馆/美术馆/博物馆等）",
  "contactPerson": "对接人姓名（如果提到了）",
  "targetDate": "目标日期（今天/明天/下周）",
  "type": "任务类型（大任务/小任务）",
  "subTasks": [
    { "title": "子任务一句话说明", "contact": "对接人" }
  ]
}

规则：
1. 子任务3-5个，按执行顺序排列
2. 如果用户说"收到"或"已发送"，第一个子任务status设为"已对接"
3. 如果没有明确对接人，contact设为"待定"
4. 每个子任务title要简洁，不超过15个字
5. 必须返回标准的JSON格式，不要有其他文字
```

**输入示例**：
```
"科技馆今天要和李供应商确认3D模型"
```

**AI分析返回**：
```json
{
  "taskTitle": "确认3D模型",
  "projectName": "科技馆",
  "contactPerson": "李供应商",
  "targetDate": "今天",
  "type": "大任务",
  "subTasks": [
    { "title": "联系李供应商", "contact": "李供应商" },
    { "title": "确认文件完整性", "contact": "李供应商" }
  ]
}
```

**系统询问**：
```
小王，这是一个大任务还是小任务？
[大任务] [小任务]
```

### 6.2 生活标签推荐（随机6个）

**LLM提示词**：
```
生成6个有趣、温暖的生活小任务，用于每日打卡。

要求：
1. 每个任务1-2句话，简单易做
2. 每个任务配一个表情图标
3. 分类包括：健康、学习、休闲
4. 要有温度，让人看了就想做
5. 随机性，每次生成不同的内容

返回JSON格式：
{
  "tags": [
    { "name": "任务名称", "icon": "表情", "category": "分类" }
  ]
}
```

**AI生成返回**：
```json
{
  "tags": [
    { "name": "给自己一个拥抱", "icon": "🧘", "category": "休闲" },
    { "name": "哼一首喜欢的歌", "icon": "🎤", "category": "休闲" },
    { "name": "看看窗外的树", "icon": "🌻", "category": "休闲" },
    { "name": "对着镜子微笑10秒", "icon": "🤭", "category": "健康" },
    { "name": "写下今天的一件好事", "icon": "✍️", "category": "学习" },
    { "name": "晚上做5分钟冥想", "icon": "🌙", "category": "健康" }
  ]
}
```

---

## 七、用户流程

### 7.1 首次使用流程

```
1. 打开应用
   ↓
2. 检测首次使用
   ↓
3. 弹出昵称设置
   ↓
4. 输入昵称（如"小王"）
   ↓
5. 保存昵称
   ↓
6. 进入工作模式
   ↓
7. 显示引导提示
```

### 7.2 每日开工流程（工作模式）

```
1. 打开应用（早晨）
   ↓
2. 检查是否今天第一次打开
   ↓
3. 如果是第一次，弹出"今日任务确认"
   ↓
4. 列出昨日未完成任务
   ↓
5. 询问是否延续
   ↓
6a. 用户选择"延续" → 复制任务到今天
6b. 用户选择"已完成" → 标记为完成
6c. 用户不选择 → 10秒后自动沿用昨天的清单
   ↓
7. 进入工作模式
   ↓
8. 语音/文字输入新任务
   ↓
9. AI识别：大任务/小任务/展馆/对接人
   ↓
10. 用户确认：大任务还是小任务
   ↓
11. 任务添加到对应展馆
   ↓
12. 完成任务勾选
```

### 7.3 每日下班流程（工作模式）

```
1. 晚上21:00后第一次打开
   ↓
2. 检查今天第一次打开
   ↓
3. 弹出"下班时间到了"
   ↓
4. 列出今日未完成任务
   ↓
5. 一键全选完成
   ↓
6. 点击"完成今日任务"
   ↓
7. 进入总结模式
   ↓
8. 查看工作总结和生活夸夸（带昵称）
   ↓
9. 可以分享或开始新的一天
```

### 7.4 生活模式流程

```
1. 点击"生活"按钮
   ↓
2. 看到18个默认生活标签（健康+学习+休闲）
   ↓
3. 选择想要做的标签
   ↓
4. 点击[AI推荐新标签 ✨]
   ↓
5. AI生成6个趣味生活小任务
   ↓
6. 可以点击[刷新]重新生成
   ↓
7. 选择全部添加或单独添加
   ↓
8. 完成后勾选
   ↓
9. 点击"完成今日生活"
   ↓
10. 进入生活总结，获得夸夸（带昵称）
```

### 7.5 开始新的一天流程

```
1. 在总结界面点击"开始新的一天"
   ↓
2. 自动清空所有生活任务
   ↓
3. 工作任务保留
   ↓
4. 自动备份工作记录到本地
   ↓
5. 弹出"今日任务确认"
   ↓
6. 询问昨日任务是否延续
   ↓
7. 开始新的一天
```

### 7.6 清除工作记录流程

```
1. 在设置点击"清除所有旧的工作"
   ↓
2. 弹出确认对话框
   ↓
3. 自动备份工作记录到本地
   ↓
4. 显示备份文件名
   ↓
5. 确认后清空所有工作任务
   ↓
6. 可以查看备份记录
```

---

## 八、界面设计

### 8.1 主界面布局

```
┌─────────────────────────────────┐
│  [工作] [生活] [总结]  ⚙️│  ← 顶部导航
├─────────────────────────────────┤
│                                 │
│  工作模式内容区                │
│  或                             │
│  生活模式内容区                │
│  或                             │
│  总结模式内容区                │
│                                 │
├─────────────────────────────────┤
│  [输入框...........] [🎤] [提交]│  ← 底部输入
└─────────────────────────────────┘
```

### 8.2 工作模式界面

```
┌─────────────────────────────────┐
│  [工作] [生活] [总结]  ⚙️│
├─────────────────────────────────┤
│  📍 科技馆 (2个进行中)     │
│    ─────────────────────     │
│    📦 大任务：3D模型确认  │
│    ✓ 联系李供应商         │
│    ⚪ 确认文件完整性     │
│    🟡 转交给技术审核     │
│                                 │
│    📝 小任务：催资料     │
│    ⚪ 给李供应商打电话     │
│                                 │
│  📍 美术馆 (1个进行中)     │
│    ─────────────────────     │
│    📦 大任务：音响设备    │
│    ⚪ 联系赵音响         │
│                                 │
│  [完成今日任务]               │
└─────────────────────────────────┘
  [输入框...........] [🎤] [提交]
```

### 8.3 生活模式界面

```
┌─────────────────────────────────┐
│  [工作] [生活] [总结]  ⚙️│
├─────────────────────────────────┤
│  🌈 小王，今日生活标签      │
│  选择你今天想做的事情：    │
│                                 │
│  ☀️ 眼保健操 (2次)          │
│    ✓ 第1次 ✓ 第2次          │
│                                 │
│  💧 补充水分 (8杯)          │
│    ✓ 第1杯 ✓ 第2杯 ✓ 第3杯 │
│    ⚪ 第4杯                  │
│    ...                       │
│                                 │
│  [AI推荐新标签 ✨]         │
│                                 │
│  [完成今日生活]              │
└─────────────────────────────────┘
```

### 8.4 总结模式界面（手写信风格）

```
┌─────────────────────────────────┐
│  [工作] [生活] [总结]  ⚙️│
├─────────────────────────────────┤
│                           │
│  ┌───────────────────┐       │
│  │ 💼              │       │
│  │ 小王，今日工作总结│       │
│  └───────────────────┘       │
│                           │
│  亲爱的小王：             │
│  今天你完成了...           │
│                           │
│  [分享文本 ✉️]           │
│  [复制文字 📋]           │
│  [保存图片 📸]           │
│                           │
│  ┌───────────────────┐       │
│  │ 🌸              │       │
│  │ 小王，今日生活夸夸│       │
│  └───────────────────┘       │
│                           │
│  亲爱的小王：             │
│  今天你好好爱自己了...     │
│                           │
│  [分享文本 ✉️]           │
│  [复制文字 📋]           │
│  [保存图片 📸]           │
│                           │
│  [开始新的一天 🌅]       │
└─────────────────────────────────┘
```

### 8.5 设置界面

```
┌─────────────────────────────────┐
│  ⚙️ 设置                    │
├─────────────────────────────────┤
│                           │
│  👤 当前昵称：小王        │
│  [修改昵称]                │
│                           │
│  ──────────────────────     │
│                           │
│  📦 工作备份记录           │
│  ──────────────────────     │
│  • 2024-01-15 (3个任务)  │
│  • 2024-01-14 (5个任务)  │
│  • 2024-01-13 (2个任务)  │
│                           │
│  [查看备份] [清除旧工作]    │
│                           │
│  [关闭]                    │
└─────────────────────────────────┘
```

---

## 九、技术要点

### 9.1 模式切换

```typescript
// 使用 React state 管理
const [currentMode, setCurrentMode] = useState<'work' | 'life' | 'summary'>('work')

// 三个独立的组件
{currentMode === 'work' && <WorkMode />}
{currentMode === 'life' && <LifeMode />}
{currentMode === 'summary' && <SummaryMode />}
```

### 9.2 每日弹窗逻辑（仅第一次打开）

```typescript
// 使用本地存储记录今天是否已弹窗
const checkFirstOpenToday = () => {
  const today = new Date().toDateString()
  const lastOpened = localStorage.getItem('lastOpened')

  const isFirstOpenToday = lastOpened !== today

  if (isFirstOpenToday && hasUncompletedTasksYesterday) {
    setPopupVisible(true)
    localStorage.setItem('lastOpened', today)
  }

  // 如果用户不选择，10秒后自动沿用昨天的清单
  setTimeout(() => {
    if (!userMadeChoice) {
      copyYesterdayTasks()
      setPopupVisible(false)
    }
  }, 10000)
}
```

### 9.3 工作任务延续逻辑

```typescript
// 延续任务：直接复制一份
const continueYesterdayTasks = async () => {
  const yesterdayTasks = await getYesterdayTasks()

  const continuedTasks = yesterdayTasks.filter(t => !t.isCompleted)

  for (const task of continuedTasks) {
    await db.workTask.create({
      title: task.title,
      type: task.type,
      projectName: task.projectName,
      contactPerson: task.contactPerson,
      targetDate: new Date(), // 今天
      isContinued: true, // 标记为延续
      subTasks: {
        create: task.subTasks.map(st => ({
          title: st.title,
          contact: st.contact,
        }))
      }
    })
  }
}
```

### 9.4 生活标签管理

```typescript
// 18个默认标签
const defaultLifeTags = [
  { name: '眼保健操', icon: '☀️', category: '健康', targetCount: 2 },
  { name: '补充水分', icon: '💧', category: '健康', targetCount: 8 },
  // ... 总共18个
]

// AI生成6个标签
const generateAILifeTags = async () => {
  const response = await zai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
  })
  return JSON.parse(response.choices[0].message.content).tags
}

// 每日刷新（清空）
const refreshLifeTags = async () => {
  await db.lifeTag.deleteMany({
    where: { date: { lt: new Date() } }
  })
}
```

### 9.5 昵称管理

```typescript
// 检查是否首次使用
const checkFirstTime = () => {
  const nickname = localStorage.getItem('userNickname')
  if (!nickname) {
    setShowNicknameDialog(true)
  } else {
    setUserNickname(nickname)
  }
}

// 保存昵称
const saveNickname = async (nickname: string) => {
  localStorage.setItem('userNickname', nickname)
  await db.userConfig.upsert({
    where: { id: 'user' },
    update: { nickname },
    create: { id: 'user', nickname },
  })
}
```

### 9.6 备份逻辑

```typescript
// 备份工作记录
const backupWorkRecords = async () => {
  const allTasks = await db.workTask.findMany({
    include: { subTasks: true },
  })

  const backupData = {
    nickname: userNickname,
    backupDate: new Date().toISOString(),
    taskCount: allTasks.length,
    tasks: allTasks,
  }

  // 保存到数据库
  await db.workBackup.create({
    nickname: userNickname,
    backupDate: new Date(),
    taskCount: allTasks.length,
    data: JSON.stringify(backupData),
  })

  // 同时保存到本地文件（如果浏览器支持）
  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `工作_${formatDate(new Date())}_${userNickname}.json`
  a.click()
}

// 清除所有工作记录
const clearAllWorkRecords = async () => {
  // 先备份
  await backupWorkRecords()

  // 清空数据库
  await db.workSubTask.deleteMany({})
  await db.workTask.deleteMany({})
}
```

### 9.7 总结文本生成（带昵称 + 手写信风格）

```typescript
const generateWorkSummary = (nickname: string, data: any) => {
  return `
亲爱的${nickname}：

今天你完成了 ${data.workBigTaskCompleted} 个大任务
和 ${data.workSmallTaskCompleted} 个小任务

${data.projectDetails}

${nickname}，今天超高效！
你真的很棒！💪

—— 来自你的AI助手
  `.trim()
}

const generateLifePraise = (nickname: string, data: any) => {
  return `
亲爱的${nickname}：

今天你好好爱自己了！

${data.lifeDetails}

${nickname}，你是最棒的！
明天继续加油💖

—— 来自你的AI助手
  `.trim()
}
```

---

## 十、手写字体资源

### 推荐手写字体

| 字体名称 | 用途 | 来源 |
|---------|------|------|
| Ma Shan Zheng | 中文手写 | Google Fonts |
| Caveat | 英文手写 | Google Fonts |
| Pacifico | 英文手写 | Google Fonts |

### 字体引入

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet">
```

### 字体使用

```css
@font-face {
  font-family: 'Handwritten';
  src: url('/fonts/ma-shan-zheng.woff2') format('woff2');
}

.handwritten {
  font-family: 'Ma Shan Zheng', 'Handwritten', cursive;
  font-size: 1.2rem;
  line-height: 1.8;
  letter-spacing: 0.05em;
  color: #333;
}
```

---

## 十一、开发优先级

### P0 - 核心功能（第1-2天）

1. ✅ 昵称功能
   - 首次使用设置昵称
   - 修改昵称
   - 所有界面使用昵称

2. ✅ 模式切换
   - 工作/生活/总结三个模式
   - 顶部导航栏

3. ✅ 工作模式：任务输入 + AI拆解
   - 文字输入
   - 语音输入（ASR）
   - AI智能识别

4. ✅ 工作模式：任务展示
   - 按展馆分组
   - 大任务/小任务分类
   - 勾选完成

5. ✅ 生活模式：18个默认标签
   - 健康类6个
   - 学习类6个
   - 休闲类6个

6. ✅ 总结模式：生成有趣总结
   - 工作总结（带昵称）
   - 生活夸夸（带昵称）

### P1 - 提升体验（第3天）

7. ✅ 早晨弹窗：延续昨日任务（仅第一次）
8. ✅ 工作任务延续
   - 大任务+小任务都可延续
   - 直接复制一份
9. ✅ 默认沿用昨天的清单
   - 10秒后自动沿用
10. ✅ 晚上弹窗：提醒完成任务（仅第一次）
11. ✅ AI推荐：生活标签生成（6个）
12. ✅ 一键刷新AI推荐

### P2 - 增强功能（第4天）

13. ✅ 手写字体风格总结
14. ✅ 分享文字功能
15. ✅ 工作备份功能
16. ✅ 清除所有旧的工作
17. ✅ 生活任务每日刷新
18. ✅ 查看备份记录

---

## 十二、验收标准

### 12.1 昵称功能验收

- [x] 首次使用可以设置昵称
- [x] 昵称可以修改
- [x] 昵称保存到 localStorage 和数据库
- [x] 所有界面都使用昵称称呼
- [x] 总结卡片带昵称
- [x] 弹窗提示带昵称
- [x] 夸夸内容带昵称

### 12.2 工作模式验收

- [x] 可以语音/文字输入任务
- [x] AI自动识别大任务/小任务
- [x] 可以选择大任务还是小任务
- [x] 按展馆分组展示
- [x] 勾选完成任务
- [x] 早晨弹窗询问延续（仅第一次）
- [x] 大任务+小任务都可延续
- [x] 不选择时10秒后自动沿用昨天的清单
- [x] 晚上弹窗提醒完成（仅第一次）
- [x] 延续任务标记为"已延续"

### 12.3 生活模式验收

- [x] 18个默认生活标签
- [x] 分类清晰（健康/学习/休闲）
- [x] AI推荐6个趣味标签
- [x] 可以一键刷新AI推荐
- [x] 完成后勾选
- [x] 每天刷新（不延续）
- [x] 开始新的一天自动清空

### 12.4 总结模式验收

- [x] 生成工作总结卡片（带昵称）
- [x] 生成生活夸夸卡片（带昵称）
- [x] 手写字体风格
- [x] 可以分享文字
- [x] 可以复制文字
- [x] 可以开始新的一天

### 12.5 备份与清理验收

- [x] 开始新的一天自动备份工作
- [x] 手动清除工作记录
- [x] 清除前自动备份
- [x] 可以查看备份记录
- [x] 备份文件名包含昵称和日期

### 12.6 交互体验验收

- [x] 每天早晨/晚上只弹一次
- [x] 弹窗不重复打扰
- [x] 10秒后自动沿用逻辑流畅
- [x] 手写字体渲染正常
- [x] 响应式设计适配
- [x] 无障碍功能支持

---

## 十三、技术栈

### 前端框架
- **框架**：Next.js 16 + App Router
- **语言**：TypeScript 5
- **样式**：Tailwind CSS 4 + shadcn/ui组件
- **状态管理**：React useState（简单场景）
- **路由**：只在 `/` 路由下实现（单页面）

### 字体与设计
- **字体**：Google Fonts (Ma Shan Zheng 手写字体)
- **图标**：Lucide React + Emoji 表情
- **设计风格**：温暖、有趣、简洁

### 数据库
- **ORM**：Prisma
- **数据库**：SQLite（客户端）
- **Schema**：5个表（用户配置、工作任务、子任务、生活标签、总结、备份）

### AI能力（后端使用）
- **SDK**：z-ai-web-dev-sdk
- **LLM**：任务拆解、生活标签推荐
- **ASR**：语音转文字

### 本地存储
- **localStorage**：昵称、弹窗状态
- **浏览器下载**：工作备份文件

---

## 十四、API设计

### 14.1 用户配置API

```
POST /api/user/nickname
Body: { "nickname": "小王" }
返回: { "success": true }

GET /api/user/nickname
返回: { "nickname": "小王" }
```

### 14.2 工作任务API

```
POST /api/work/tasks
Body: { "input": "科技馆今天要和李供应商确认3D模型" }
返回: { "task": {...}, "analysis": {...} }

GET /api/work/tasks
返回: { "tasks": [...] }

PATCH /api/work/tasks/:id
Body: { "isCompleted": true }
返回: { "task": {...} }

DELETE /api/work/tasks/:id
返回: { "success": true }
```

### 14.3 生活标签API

```
GET /api/life/tags/default
返回: { "tags": [...] }

POST /api/life/tags/ai-generate
返回: { "tags": [...] }

POST /api/life/tags/select
Body: { "tagIds": [...] }
返回: { "success": true }

PATCH /api/life/tags/:id
Body: { "completedCount": 2 }
返回: { "tag": {...} }
```

### 14.4 总结API

```
POST /api/summary/generate
Body: { "date": "2024-01-15" }
返回: { "workSummary": "...", "lifeSummary": "..." }

GET /api/summary/history
返回: { "summaries": [...] }
```

### 14.5 备份API

```
POST /api/backup/create
返回: { "backup": {...}, "downloadUrl": "..." }

GET /api/backup/list
返回: { "backups": [...] }

POST /api/backup/restore/:id
返回: { "success": true }
```

### 14.6 语音转文字API

```
POST /api/speech
Body: { "audio": "base64编码的音频数据" }
返回: { "text": "转换后的文字" }
```

---

## 十五、项目结构

```
src/
├── app/
│   ├── page.tsx                          # 主页面（单页面应用）
│   ├── api/
│   │   ├── user/
│   │   │   └── nickname/route.ts    # 昵称管理API
│   │   ├── work/
│   │   │   ├── tasks/route.ts        # 工作任务API
│   │   │   └── subtasks/[id]/route.ts  # 子任务更新API
│   │   ├── life/
│   │   │   ├── tags/route.ts         # 生活标签API
│   │   │   └── ai-generate/route.ts   # AI推荐API
│   │   ├── summary/
│   │   │   ├── generate/route.ts     # 生成总结API
│   │   │   └── history/route.ts     # 历史总结API
│   │   ├── backup/
│   │   │   ├── create/route.ts      # 创建备份API
│   │   │   ├── list/route.ts        # 备份列表API
│   │   │   └── restore/[id]/route.ts # 恢复备份API
│   │   └── speech/route.ts          # 语音转文字API（ASR）
├── components/
│   ├── Navigation.tsx                   # 顶部导航栏
│   ├── TaskInput.tsx                   # 底部输入栏（文字+语音）
│   ├── WorkMode/
│   │   ├── ProjectCard.tsx             # 展馆卡片
│   │   ├── TaskItem.tsx               # 大任务项
│   │   └── SubTaskItem.tsx            # 子任务项
│   ├── LifeMode/
│   │   ├── LifeTagList.tsx            # 生活标签列表
│   │   ├── DefaultTags.tsx            # 默认标签
│   │   ├── AITags.tsx                # AI推荐标签
│   │   └── LifeTagItem.tsx           # 单个标签项
│   ├── SummaryMode/
│   │   ├── WorkSummaryCard.tsx        # 工作总结卡片
│   │   ├── LifePraiseCard.tsx         # 生活夸夸卡片
│   │   └── ShareButtons.tsx          # 分享按钮
│   └── dialogs/
│       ├── NicknameDialog.tsx         # 昵称设置弹窗
│       ├── MorningPopup.tsx           # 早晨弹窗
│       ├── EveningPopup.tsx           # 晚上弹窗
│       ├── BackupDialog.tsx           # 备份弹窗
│       └── ClearWorkDialog.tsx       # 清除工作弹窗
├── lib/
│   ├── db.ts                           # Prisma客户端
│   ├── ai.ts                           # AI封装（LLM + ASR）
│   ├── storage.ts                      # localStorage封装
│   └── utils.ts                        # 工具函数
└── styles/
    └── handwritten.css                  # 手写字体样式
```

---

## 十六、核心原则

### 快速
- 语音+AI，记录任务超快（3秒完成）
- 一键操作，减少点击次数
- 自动备份，不担心数据丢失

### 有趣
- 生活夸夸，每天都是正向反馈
- 工作总结，看到自己的进步
- AI推荐，每天都有新的小惊喜

### 简洁
- 工作生活分离，不混乱
- 一行一个任务，信息清晰
- 每日刷新，生活无压力

### 有温度
- 昵称称呼，感觉被关心
- 手写信风格，总结像一封信
- 温暖的文案，让人心情愉悦

### 智能
- AI自动拆解，不用手动整理
- 智能识别展馆、对接人
- AI推荐趣味生活任务，不重复

---

## 十七、下一步

请开发团队按照此需求文档，开始开发这个有趣、有温度的工作生活双模式 TodoList！

**开发步骤建议**：

### 第一阶段（第1-2天）：核心功能
1. 数据库Schema设计
2. 昵称功能
3. 模式切换
4. 工作模式基础UI
5. 生活模式基础UI
6. 总结模式基础UI

### 第二阶段（第3天）：AI集成
7. LLM任务拆解
8. ASR语音输入
9. AI生活标签推荐
10. 总结文本生成

### 第三阶段（第4天）：提升体验
11. 早晨/晚上弹窗
12. 任务延续逻辑
13. 备份功能
14. 手写字体样式
15. 分享功能

**祝开发顺利！🚀**

---

## 附录

### 附录A：18个默认生活标签完整列表

**健康类（6个）**
1. ☀️ 眼保健操 (2次)
2. 💧 补充水分 (8杯)
3. 🚶‍♂️ 散步 (30分钟)
4. 🧘 深呼吸 (10次)
5. 🥗 健康饮食 (1顿)
6. 😴 早睡早起

**学习类（6个）**
7. 📚 阅读 (30分钟)
8. 🎵 听音乐 (放松)
9. 📝 写日记
10. 🎨 画画/涂鸦
11. 🧩 学习新技能
12. 🎥 看纪录片

**休闲类（6个）**
13. 📞 和朋友打个电话
14. 🐱 和宠物玩耍
15. 🎮 玩小游戏 (20分钟)
16. ☕ 喝杯茶放松
17. 🌸 闻一闻花香
18. 📸 拍一张生活照

### 附录B：手写字体CDN链接

```html
<!-- Google Fonts: Ma Shan Zheng (中文手写）-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet">

<!-- Google Fonts: Caveat (英文手写）-->
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap" rel="stylesheet">
```

### 附录C：本地存储Key列表

```typescript
// localStorage Keys
const STORAGE_KEYS = {
  USER_NICKNAME: 'userNickname',
  LAST_OPENED_DATE: 'lastOpened',
  LAST_POPUP_DATE: 'lastPopupDate',
  USER_MADE_CHOICE: 'userMadeChoice',
} as const
```

### 附录D：LLM提示词模板汇总

**工作任务拆解提示词**：
```
分析用户的输入，提取项目、任务标题、子任务。

输入：${input}

返回JSON格式：
{
  "taskTitle": "大任务标题（简洁）",
  "projectName": "项目名称",
  "contactPerson": "对接人姓名",
  "targetDate": "目标日期",
  "type": "任务类型（大任务/小任务）",
  "subTasks": [
    { "title": "子任务一句话说明", "contact": "对接人" }
  ]
}

规则：
1. 子任务3-5个，按执行顺序排列
2. 如果用户说"收到"或"已发送"，第一个子任务status设为"已对接"
3. 如果没有明确对接人，contact设为"待定"
4. 每个子任务title要简洁，不超过15个字
5. 必须返回标准的JSON格式
```

**生活标签推荐提示词**：
```
生成6个有趣、温暖的生活小任务，用于每日打卡。

要求：
1. 每个任务1-2句话，简单易做
2. 每个任务配一个表情图标
3. 分类包括：健康、学习、休闲
4. 要有温度，让人看了就想做
5. 随机性，每次生成不同的内容

返回JSON格式：
{
  "tags": [
    { "name": "任务名称", "icon": "表情", "category": "分类" }
  ]
}
```

---

**文档版本**：v3.0
**最后更新**：2024-01-15
**维护者**：产品团队
