# 💖 MatchBoard CRM

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**MatchBoard** 是一款专为同学和朋友设计的、极致优雅的**个人关系管理系统 (CRM)**。它旨在帮助你通过直观、无摩擦的方式追踪、组织和分析你的社交动态与人际网络。

本系统不仅拥有精美的 UI 设计，还深度考虑了隐私保护。它完全在浏览器端**离线运行**，所有数据均加密存储在本地（LocalStorage），确保你的隐私永远不会离开你的设备。

---

## ✨ 核心功能

### 📊 可视化 Kanban 管理
- **拖拽式流程**：使用流畅的拖拽功能（基于 `@dnd-kit`）在不同阶段（如：新朋友、联系中、已见面、暂停、已结束）之间移动联系人。
- **动态仪表盘**：实时查看人际网络的健康状况与关键统计数据。

### 👥 全方位的联系人追踪
- **互动时间轴**：记录每一次通话、聊天或聚会。系统会自动计算“最后活跃时间”，帮你识别谁需要近期维护。
- **详尽档案**：保存年龄、城市、职业、共同兴趣等信息，并按时间顺序记录关系发展史。

### 🏷️ 灵活的标签系统
- **个性化定制**：在设置菜单中创建自定义标签，并为其分配不同的色彩，方便分类检索。
- **全局同步**：修改或删除标签会立即应用到所有相关的联系人档案中。

### 🎛️ 智能排序与筛选
- **多维度排序**：支持按最后活跃、添加日期、年龄等进行排序。
- **毫秒级搜索**：通过名称、城市、职业或状态快速定位目标。

### 💾 隐私、备份与导出
- **100% 离线**：无需服务器，无需账号，数据仅存储在浏览器本地。
- **导出 PDF**：一键生成排版精美的 PDF 报告（基于 `jsPDF`），方便离线阅读或备份。
- **JSON 备份**：支持全量数据导出为 JSON 文件，并在更换浏览器时轻松还原。

---

## 🛠️ 技术栈

- **前端框架**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式方案**: Vanilla CSS (CSS 变量 + 响应式设计)
- **状态管理**: React Context API + 自定义 Hooks (LocalStorage 持久化)
- **图标库**: [Lucide React](https://lucide.dev/)
- **拖拽引擎**: [@dnd-kit](https://dndkit.com/)
- **报表生成**: `jspdf` & `jspdf-autotable`

---

## 🚀 快速上手

### 1. 环境准备
确保你的电脑已安装 [Node.js](https://nodejs.org/) (推荐 v18+)。

### 2. 安装与运行

```bash
# 1. 进入项目目录
cd matchboard

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

### 3. 访问项目
打开浏览器访问 `http://localhost:5173` 即可开始使用。

---

## 📂 项目结构 (供开发参考)

如果你想研究或修改代码，这里是项目的目录结构说明：

```text
src/
├── components/     # UI 原子组件（按钮、卡片、输入框、弹窗等）
├── contexts/       # 全局上下文（如 Toast 通知、全局状态）
├── hooks/          # 自定义 Hooks（useStore 处理数据逻辑，useLocalStorage 处理持久化）
├── lib/            # 工具函数（存储管理 storage.ts, 工具类 utils.ts）
├── types/          # TypeScript 类型定义
├── views/          # 页面级组件
│   ├── Dashboard.tsx    # 核心 Kanban 看板
│   ├── Overview.tsx     # 数据概览与分析
│   └── CandidateDetail.tsx # 联系人详情页
├── App.tsx         # 路由配置与应用入口
└── main.tsx        # 挂载 React 根节点
```

---

## 🎨 设计初衷

MatchBoard 采用了温润、专业的 **"鼠尾草绿" (Sage Green)** 为主色调 (`#7ab095`)。我们致力于打造一个比普通网页应用更具“质感”的界面，结合毛玻璃效果 (Glassmorphism) 和细腻的微动画，让管理社交关系成为一种视觉上的享受。

---

## 🤝 贡献与反馈

如果你在学习代码的过程中有任何疑问，或者想为本项目添加新功能（例如：统计图表、更多导出格式等），欢迎随时联系！

> *人际关系需要用心经营，而管理它们应当赏心悦目。*

