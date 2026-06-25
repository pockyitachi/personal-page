# ICML 2026 · GUI Agent 相关论文汇总与方向分析

> 来源：孟方醒整理的 ICML 2026 GUI/Web/Computer-use agent paper list（约 35 篇）。
> 标题已通过 GitHub 仓库 `jiaxianyan/icml-2026-agent-papers` + icml.cc poster 链接核实为真实 ICML 2026 录用论文。
> arXiv ID 来自网页搜索结果，本环境无法直连 arxiv.org 逐条核验，请点击确认；标「待核实」的为可信度较低或标题有出入者。

---

## 一、清单 + arXiv 链接（按方向分组）

### 1. 训练供给：可合成数据、可验证环境与 world model
让 agent 真正拉开差距的，往往不是模型本身，而是谁能更稳定地拿到训练数据 / 定义环境 / 做好评测。

| # | 标题 | arXiv | 一句话 |
|---|------|-------|--------|
| 1 | Safe and Scalable Web Agent Learning via Recreated Websites | [2603.10505](https://arxiv.org/abs/2603.10505) | VeriEnv：用 LLM 把真实网站克隆成可执行、可程序化验证奖励的合成环境，安全地脱离真实网络训练 |
| 2 | Video2GUI: Synthesizing Large-Scale Interaction Trajectories for Generalized GUI Agent Pretraining | [2605.14747](https://arxiv.org/abs/2605.14747) | 从互联网教程视频自动抽取 GUI 操作轨迹，构建 WildGUI（12M 轨迹 / 1500+ app） |
| 3 | AutoWebWorld: Synthesizing Infinite Verifiable Web Environments via Finite State Machines | [2602.14296](https://arxiv.org/abs/2602.14296) | 用有限状态机建模网页 + coding agent 渲染成可交互网站，动作与任务成功可程序化验证 |
| 4 | Weasel: Out-of-Domain Generalization for Web Agents via Importance-Diversity Data Selection | [2605.20291](https://arxiv.org/abs/2605.20291) | 离线 web agent 训练的轨迹/步骤选择法，兼顾「重要性 + 多样性」，提升零样本跨域迁移 |
| 5 | WebWorld: A Large-Scale World Model for Web Agent Training | [2602.14721](https://arxiv.org/abs/2602.14721) | 首个开放网页大规模 world model（1M+ 真实轨迹），当浏览器模拟器做多轮 agent 训练（Qwen） |

### 2. Benchmark：更贴近真实使用场景
评测从「能不能点对」走向「在真实、个性化、多应用场景下稳不稳」。

| # | 标题 | arXiv | 一句话 |
|---|------|-------|--------|
| 6 | Persona2Web: Benchmarking Personalized Web Agents for Contextual Reasoning with User History | [2602.17003](https://arxiv.org/abs/2602.17003) | 首个真实开放网页上的「个性化 web agent」基准，需从用户历史推断偏好、澄清模糊指令 |
| 7 | VenusBench-Mobile: A Challenging and User-Centric Benchmark for Mobile GUI Agents with Capability Diagnostics | [2604.06182](https://arxiv.org/abs/2604.06182) | 在线、用户意图驱动的手机 GUI 基准，带能力维度诊断；发现失败主要源于感知/记忆缺陷 |
| 8 | (AgentWebBench) Benchmarking Multi-Agent Coordination in Agentic Web | [2604.10938](https://arxiv.org/abs/2604.10938) | 评测「用户 agent ↔ 网站 content agent」协同；发现去中心化多 agent 协同普遍落后于集中式检索 |
| 9 | Scaling, Benchmarking, and Reasoning of Vision-Language Agents for Mobile GUI Navigation | **未找到 arXiv**（疑 ICML-only） | 手机 GUI 导航：数据/模型 scaling、导航基准与 VLA 推理能力 |
| 10 | CUARewardBench: Benchmark for Evaluating Reward Models on Computer-using Agent Trajectories | [2510.18596](https://arxiv.org/abs/2510.18596) | 首个评测 computer-use agent 的 outcome/process 奖励模型的基准（轨迹级 + 步级） |
| 11 | PSBench: Editing Image via GUI Agents in Photoshop | **未上 arXiv**（仅 OpenReview） | 首个 Photoshop 图像编辑 GUI agent 基准，600 个分层（非破坏式）人工标注任务 |
| 12 | PPT-Eval / **PPTArena**: A Benchmark for Computer-Use Agents on PowerPoint Tasks | [2512.03042](https://arxiv.org/abs/2512.03042) *(以 PPTArena 名)* | 120 个 PPT 任务 + rubric 打分器（部分给分）；前沿 agent 成功率仍低（Claude-Sonnet-4 约 43%） |
| 13 | DocOS: (Towards) Proactive Document-Guided Actions in GUI Agents | [2605.18048](https://arxiv.org/abs/2605.18048) | 提出「主动文档引导动作」：agent 自行上网找文档，并把流程说明落地为 GUI 操作 |
| 14 | WinDeskGround: A Benchmark for Robust GUI Grounding in Complex Multi-Window Desktop Environments | [2605.16402](https://arxiv.org/abs/2605.16402) | 多窗口堆叠/遮挡/杂乱下的 grounding 鲁棒性基准（L1 干净→L5 >10 窗口、70% 遮挡） |

### 3. 从点坐标走向结构化界面理解（Grounding）
不再把 grounding 当「测一个点击坐标」，而是当成界面结构理解问题。

| # | 标题 | arXiv | 一句话 |
|---|------|-------|--------|
| 15 | Learning GUI Grounding with Spatial Reasoning from Visual Feedback | [2509.21552](https://arxiv.org/abs/2509.21552) | GUI-Cursor：把 grounding 变成带「光标视觉反馈」的多步交互过程，在线 RL 训练，刷新 ScreenSpot |
| 16 | Trifuse: Enhancing Attention-Based GUI Grounding via Multimodal Fusion | [2602.06351](https://arxiv.org/abs/2602.06351) | 免训练 grounding：融合注意力图 + OCR 文本 + 图标语义（Consensus-SinglePeak 融合） |
| 17 | GUI-Spotlight: Adaptive Iterative Focus Refinement for Enhanced GUI Visual Grounding | [2510.04039](https://arxiv.org/abs/2510.04039) | 用裁剪/取色/查找等视觉工具像「聚光灯」一样迭代缩小焦点；仅 18.5K 样本达 52.8% ScreenSpot-Pro |
| 18 | Moving Beyond Sparse Grounding with Complete Screen Parsing Supervision | [2602.14276](https://arxiv.org/abs/2602.14276) | ScreenParse 密集标注数据集（771K 图/21M 元素）+ 316M 小模型 ScreenVLM，输出结构化 ScreenTag |

### 4. 长程任务中的记忆、自我进化与持续学习
社区越来越在意 agent 跨任务、跨应用、跨时间的稳定性。

| # | 标题 | arXiv | 一句话 |
|---|------|-------|--------|
| 19 | Darwinian Memory: A Training-Free Self-Regulating Memory System for GUI Agent Evolution | [2601.22528](https://arxiv.org/abs/2601.22528) | 免训练「达尔文式」记忆生态，按「适者生存」拆解/裁剪轨迹单元；成功率 +约18%、稳定性 +约34% |
| 20 | EVOLVING ROLLOUTS: Harnessing Historical Experience for Web Agent Evolution in RL | **未上 arXiv**（仅 OpenReview） | 把零方差 rollout 的信号回收进「经验库」做 in-context 引导，同时保留 GRPO 参数优化 |
| 21 | SEAgent: Self-Evolving Computer Use Agent with Autonomous Learning from Experience | [2508.04700](https://arxiv.org/abs/2508.04700) | 自进化 CUA：靠 World State Model（步级评估）+ Curriculum Generator（由易到难）自主探索陌生软件 |
| 22 | SE-GA: Memory-Augmented Self-Evolution for GUI Agents | [2605.16883](https://arxiv.org/abs/2605.16883) | 分层记忆（测试时记忆扩展，检索 episodic/semantic/experiential）+ 记忆增强自进化训练 |
| 23 | Executable Agentic Memory for GUI Agent | **未找到精确 arXiv**（疑似 ActionEngine [2602.20502](https://arxiv.org/abs/2602.20502)，待核实） | 可执行/可更新的状态机式记忆，把 GUI 任务合成为可执行程序 |
| 24 | Continual GUI Agents | [2601.20732](https://arxiv.org/abs/2601.20732) | 提出「持续 GUI agent」任务（域/分辨率漂移下的持续学习）+ GUI-AiF 强化微调框架 |

### 5. 安全、鲁棒性与错误恢复
prompt injection、偏航动作、错误恢复、CAPTCHA 对抗等，已不再是边角问题。

| # | 标题 | arXiv | 一句话 |
|---|------|-------|--------|
| 25 | Next-Gen CAPTCHAs: Leveraging the Cognitive Gap for Scalable and Diverse GUI-Agent Defense | [2602.09012](https://arxiv.org/abs/2602.09012) | 设计 27 类利用「人机认知差」的 CAPTCHA 家族 + 无限生成管线，作为对抗 GUI agent 的防御 |
| 26 | Recovering Policy-Induced Errors: Benchmarking and Trajectory Synthesis for Robust GUI Agents | [2605.29447](https://arxiv.org/abs/2605.29447) | GUI-RobustEval 基准 + RoTS 树式在线轨迹合成（发现失败模式并合成恢复 rollout），OSWorld SOTA |
| 27 | It's a TRAP! Task-Redirecting Agent Persuasion Benchmark for Web Agents | [2512.23128](https://arxiv.org/abs/2512.23128) | 衡量「劝说式」prompt injection 把 web agent 带偏的基准；6 个前沿模型平均约 25% 被带偏 |
| 28 | When Actions Go Off-Task: Detecting and Correcting Misaligned Actions in Computer-Use Agents | [2602.08995](https://arxiv.org/abs/2602.08995) | MisActBench（动作级对齐标注）+ DeAction 护栏：执行前检测并迭代纠正偏航动作，攻击成功率 −90%+ |
| 29 | When Benign Inputs Lead to Severe Harms: Eliciting Unsafe Unintended Behaviors of Computer-Use Agents | [2602.08235](https://arxiv.org/abs/2602.08235) | AutoElicit：用执行反馈迭代扰动「善意指令」诱发有害行为，发布 Seed/Bench 数据 |
| 30 | (AgentHijack) Benchmarking Computer Use Agent Robustness to Common Environment Corruptions | **未确认 arXiv**（疑代号 AgentHijack） | CUA 对常见环境扰动（界面腐蚀）的鲁棒性基准 |

### 6. 交互范式、动作抽象与执行系统优化
开始反思传统「看屏幕→出一步动作→再看屏幕」的 agent loop 是否够高效可靠。

| # | 标题 | arXiv | 一句话 |
|---|------|-------|--------|
| 31 | Beyond Static Endpoints: Tool Programs as an Interface for Flexible Agentic Web Services | [2606.19992](https://arxiv.org/abs/2606.19992) | ToolPro：把工具意图表达成可执行「工具程序」（含循环/条件/重试），端到端延迟 −53%、流量 −96% |
| 32 | Faithful Mobile GUI Agents with Guided Advantage Estimator | [2605.01208](https://arxiv.org/abs/2605.01208) | 让动作扎根于屏幕证据而非记忆捷径；忠实性 SFT + GuAE（锚点式 GRPO 精化），Trap 成功率 14%→80% |
| 33 | CAPTCHA Solving for Native GUI Agents: Automated Reasoning-Action Data Generation and Self-Corrective Training | [2603.23559](https://arxiv.org/abs/2603.23559) | ReCAP：自动生成带推理轨迹的 CAPTCHA 数据 + 自纠错训练，7 类交互式验证码成功率 30%→80% |
| 34 | Agent JIT Compilation for Latency-Optimizing Computer-Use Agent Planning and Scheduling | [2605.21470](https://arxiv.org/abs/2605.21470) *(arXiv 标题作 "Web Agent"，待核实)* | 把自然语言任务「即时编译」成可执行代码：JIT-Planner（最小成本计划）+ JIT-Scheduler（并行调度） |
| 35 | Position: Web Agents Should Use Typed Actions Instead of Click-Based Browsing | [2602.17245](https://arxiv.org/abs/2602.17245) | 立场论文：从底层点击/键入转向「typed actions / web verbs」（带类型的语义层），更鲁棒可审计 |

---

## 二、未找到 / 待核实清单（5 篇 + 若干 ID 注意）
- **#9 Scaling, Benchmarking, and Reasoning of VLA for Mobile GUI Navigation** — 未找到 arXiv 版本
- **#11 PSBench** — 仅 OpenReview
- **#20 EVOLVING ROLLOUTS** — 仅 OpenReview
- **#23 Executable Agentic Memory** — 无精确匹配（ActionEngine 2602.20502 仅为主题相近的待核实候选）
- **#30 (AgentHijack)** — 未确认 arXiv 页/ID
- ID 注意：#12 实际题为 **PPTArena**（非 PPT-Eval）；#13 arXiv 标题为 "Towards…"（一处 snippet 出现 2605.18047，以 18048 为准）；#34 arXiv 标题写作 "Web Agent" 而非 "Computer-Use Agent"。
- 所有 arXiv ID 均来自搜索结果、未能在本环境直连 arxiv.org 核验（被网络策略拦截），请点击确认。

---

## 三、最近 GUI Agent 在做什么 / 有什么进展（趋势综述）

把这 35 篇放在一起看，传递的信号相当一致：**下一阶段真正拉开差距的，很可能不只是底层模型，而是谁能更稳定地「拿到训练数据 → 定义环境 → 做好评测」，并把感知、记忆、动作和安全约束真正接成一条链路。** 六个方向恰好对应这条链路的不同环节：

**1. 训练供给成为主战场（数据 / 环境 / world model）。**
真实网络又慢、又不可控、又有副作用，于是大家转向「合成可验证环境」：用 LLM 克隆真实网站（VeriEnv）、用有限状态机生成无限可验证网页（AutoWebWorld）、从教程视频里挖 12M 真实轨迹（Video2GUI），乃至直接训练「网页 world model」当浏览器模拟器（WebWorld）。共同点是**追求「程序化可验证奖励」而非 LLM-as-judge**，以及把数据从「人工采集」转向「可规模化合成」。Weasel 则补上另一面：数据多了之后怎么选得准、选得多样。

**2. 评测从「能点对」走向「真实、个性化、可诊断」。**
基准明显在往真实使用场景靠：个性化（Persona2Web，需读用户历史）、移动端真实意图（VenusBench-Mobile）、专业软件（Photoshop / PowerPoint / 多窗口桌面）、甚至 agentic web 里的多 agent 协同（AgentWebBench）。同时出现**对奖励模型本身的评测**（CUARewardBench）和**能力维度诊断**（指出失败多源于感知/记忆，而非纯动作），评测正在变得更细粒度、更可解释。

**3. Grounding 从「回归一个坐标」升级为「结构化界面理解」。**
新做法包括：把 grounding 变成带视觉反馈的多步交互过程（GUI-Cursor）、免训练地融合注意力+OCR+图标语义（Trifuse）、用视觉工具迭代聚焦（GUI-Spotlight）、以及用密集全屏解析监督替代稀疏点标注（ScreenParse/ScreenVLM）。趋势是**更少标注、更小模型、更强的对遮挡/高分屏/专业界面的鲁棒性**。

**4. 长程稳定性 = 记忆 + 自我进化 + 持续学习。**
社区越来越关心 agent 跨任务、跨应用、跨时间的稳定性。出现了把记忆当「可进化生态」（Darwinian Memory）、回收失败/零方差 rollout 当经验（Evolving Rollouts）、靠世界模型+课程自主进化（SEAgent）、分层记忆+自进化训练（SE-GA），以及正式提出**「持续 GUI agent」任务**应对分布漂移（Continual GUI Agents）。关键词：**training-free 记忆、自生成课程、经验复用**。

**5. 安全/鲁棒性已从边角问题变为一等公民。**
覆盖了完整威胁面：prompt injection / 劝说式带偏（TRAP）、善意输入诱发有害行为（AutoElicit）、动作偏航检测与纠正（DeAction）、错误恢复轨迹合成（RoTS），以及把 CAPTCHA 同时当**攻防两端**来研究（Next-Gen CAPTCHAs 做防御 / ReCAP 做求解）。趋势是**从「能不能攻破」转向「能不能在执行前拦住并恢复」**。

**6. 反思 agent loop 本身：动作抽象与执行系统优化。**
开始质疑「看屏幕→出一步→再看屏幕」的低效循环：改用带类型的语义动作（Typed Actions / web verbs）、把多步意图编译成可执行工具程序（ToolPro）、把任务即时编译成可并行调度的代码（Agent JIT），以及让动作忠实扎根屏幕证据而非记忆捷径（Faithful-Agent）。趋势是**把 agent 从「逐步点击的操作者」抬升为「会规划、会编译、会调度的执行系统」**，同时优化延迟与可靠性。

**一句话总结：** ICML 2026 这批工作显示 GUI agent 正从「比谁模型强」转向「比谁的数据-环境-评测-记忆-安全链路更完整、更可验证」。可验证环境、可诊断评测、可进化记忆、可恢复的安全护栏，以及对低效 agent loop 的范式反思，是当前最集中的五条进展线。
