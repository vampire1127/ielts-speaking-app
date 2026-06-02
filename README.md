# 雅思口语练习 | IELTS Speaking Practice

纯前端雅思口语练习网页应用，无需后端、无需数据库，可直接部署到 **Vercel** 或 **GitHub Pages**。

![Tech Stack](https://img.shields.io/badge/HTML/CSS/JS-纯前端-blue) ![Deploy](https://img.shields.io/badge/Deploy-Vercel%20%7C%20GitHub%20Pages-green)

## 功能特性

- **Part 1 / 2 / 3 随机抽题** — 内置 40+ 道真题风格题目
- **浏览器录音** — 使用 MediaRecorder API，支持回放
- **AI 智能评分** — 流利度、词汇、语法、发音四项评分 + 中文评语
- **高分范例回答** — 每题附带 Band 7+ 范例
- **本地历史记录** — 自动保存练习记录到 localStorage
- **计时器** — Part 2 支持 1 分钟准备 + 2 分钟回答
- **移动端适配** — 响应式设计，手机/平板/桌面均可使用

## 快速开始

### 本地运行

直接用浏览器打开 `index.html`，或使用本地服务器：

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

然后访问 `http://localhost:8080`

### 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 无需任何构建配置，直接 Deploy

或使用 Vercel CLI：

```bash
npm i -g vercel
vercel
```

### 部署到 GitHub Pages

1. 推送代码到 GitHub 仓库
2. 进入仓库 **Settings → Pages**
3. Source 选择 `main` 分支，目录选 `/ (root)`
4. 保存后访问 `https://<username>.github.io/<repo>/`

## 文件结构

```
ielts-speaking-app/
├── index.html      # 主页面
├── style.css       # 样式（响应式 UI）
├── script.js       # 应用逻辑（录音、评分、历史）
├── questions.js    # 题库数据
└── README.md       # 说明文档
```

## 使用说明

### 基本流程

1. 选择 **Part 1 / 2 / 3** 标签
2. 点击 **换一题** 获取随机题目
3. 点击 **开始** 启动计时器（Part 2 自动切换准备/回答阶段）
4. 点击 **开始录音** 进行口语练习
5. 点击 **停止** 结束录音
6. 系统自动评分（或在设置中关闭自动评分后手动点击）

### AI 评分模式

应用提供两种评分方式：

| 模式 | 说明 |
|------|------|
| **智能评分（默认）** | 使用浏览器 Web Speech API 识别语音，结合语言分析算法评估四项分数。完全免费，无需 API Key。 |
| **OpenAI 评分（可选）** | 在设置中填入 OpenAI API Key，使用 GPT-4o-mini + Whisper 进行更精准的评分。密钥仅保存在本地浏览器。 |

### 设置项

- **OpenAI API Key** — 可选，用于增强评分和语音转文字
- **目标分数** — 达到目标时会弹出提示
- **录音结束后自动评分** — 默认开启

## 浏览器兼容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| 录音 | ✅ | ✅ | ✅ | ✅ |
| 语音识别 | ✅ | ✅ (15+) | ❌ | ✅ |
| 本地存储 | ✅ | ✅ | ✅ | ✅ |

> 推荐使用 **Chrome** 或 **Edge** 以获得最佳语音识别体验。

## 隐私说明

- 所有数据（设置、历史记录）仅保存在您的浏览器 localStorage 中
- 录音不会上传到任何服务器（除非您主动配置了 OpenAI API Key）
- 无用户追踪、无 Cookie、无第三方分析

## 技术栈

- HTML5 + CSS3 + Vanilla JavaScript
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) — 浏览器录音
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) — 语音识别
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — 本地数据持久化
- [OpenAI API](https://platform.openai.com/) — 可选增强评分

## License

MIT
