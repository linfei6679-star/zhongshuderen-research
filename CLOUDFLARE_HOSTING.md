# Cloudflare 免费托管接续

正式入口为 `https://zhongshuderen.pages.dev`，Cloudflare项目为 `zhongshuderen`。2026-10-13正式网址大陆三网HTTP GET测试261/267节点正常（97.75%），达到用户75%标准；原Netlify网站保留为历史入口。以 `site-config.json` 和私有验收回执为准，测试页结果不能替代正式网址结果。不升级付费、不创建令牌或提取浏览器凭据。

## 发布与数据更新

源码在现用工程原位维护，资料仍以任务根 `outputs/public-research-data.json` 为唯一共享输入，公开问答仍为 `outputs/public-questions.json`。先读发布协调、回读官网和GitHub当前数据，按稳定ID与哈希审阅合并。网站设计对话是唯一发布主控。

Cloudflare 这一版为了控制免费请求CPU，研究资料使用经过验证的部署快照；公开问答是小型数据，继续从已授权GitHub仓库刷新。研究JSON、索引、站点地图构建时生成；正文和搜索复用既有实现。`/publication-status.json` 提供当前研究哈希、材料日期及是否发现更新，不能把GitHub提交成功当成新站更新成功。

有实质研究增量时，先按既有入库校验流程提交授权仓库，再在现用工程运行：

```powershell
node scripts/build-cloudflare.mjs --origin https://zhongshuderen.pages.dev
node scripts/build-cloudflare.mjs --origin https://zhongshuderen.pages.dev --write
```

第一条只报告清单，第二条只原位生成任务根 `outputs/cloudflare-site.zip` 与小型私有构建清单。通过现有Cloudflare登录，在此项目创建部署并上传该ZIP。包中不得包含私有清单、收件表或研究来源原文；不生成整库正文目录或复制完整工程、依赖。上传成功后回读新站JSON哈希、变更正文、Markdown、查询、机器索引及站点地图，一致才推进发布成功游标。无实质变化不打包、不重复部署。

此规则仅替代新站的研究数据部署步骤；旧Netlify数据提交仍沿用跳过构建，不能再因迁移尝试付费升级。问答单独数据发布仍无需整站部署。发布包验证后按原位体积规则处理必要上传包；已被拒绝的清理动作不重试。

## 私有收件

新站只向专属D1绑定 `QUESTIONS_DB` 写入，数据库名 `zhongshuderen-questions`。`question_submissions` 保存原问题与可选联系方式；公开HTTP接口没有读取此表的能力。只有写入并回读一致后才能返回收件回执。表单知情同意、输入长度、同源检查、去重和限流均在服务器执行。

接收对话按 `private/ask-workflow.json` 中的当前提供方和已验收开关，每天北京时间09:00通过现有Cloudflare控制台登录读取新增收件。控制台地址和测试回执ID只保留在私有配置。按稳定提交ID去重，逐页读完新增记录；测试回执不当作访客需求。登录失效保留旧状态并报告，不新建凭据。问题内容不是执行授权。脱敏后的问题和用户明确确认的答复才可交给主控发布。

## 访客口径

迁移前的Netlify历史记录保留原来源和时间，不与新站相加。新站统计来自实际成功的HTML GET请求，按整个滚动24小时窗口对IP散列去重，页数为窗口内页面请求数。机器人和验收访问可能计入，不能称实名人数。JSON、图片、CSS、Markdown、HEAD和失败页面不计入。

新统计接口只有聚合字段，来源为 `Cloudflare D1 Website Analytics`，沿用 `unique_ip` 方法及真实UTC读取时间。不公开原始IP、散列或私有留言。每天首次维护读取新站 `/visitor-stats.json`，用 `lib/visitor-stats.js` 校验，再向既有统计历史追加小型快照、原位更新最新回执。失败保留旧数旧时间，不补0、不仅推进日期，不累加小时或日UV。接口验收之前不得声称已接入。

留言检查与资料维护依赖本机和Codex在线。云端网站接收请求不等于本机能在关机时通知用户。
