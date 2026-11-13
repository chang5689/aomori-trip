# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. 專案簡介

- 青森六天五夜（2026/12/20～12/25）的旅遊行程網站，出門在外用手機查每天行程、地點資訊、緊急電話和行前清單。
- 使用者：網站作者本人與同行朋友（台灣旅客，用手機瀏覽）。作者是程式初學者。
- 部署在 GitHub Pages。這個資料夾是 git repo（2026/11/13 起），remote `origin` 指向 GitHub，分支 `main`；改完由 Claude 推送，作者不再拖曳上傳。
- 網站網址：https://chang5689.github.io/aomori-trip/ （GitHub 帳號 `chang5689`、repo `aomori-trip`）。
- 另有**新版網站**（日系繪本風，2026/11/13 開始製作，尚未完成）：https://chang5689.github.io/aomori-trip/new.html 。舊版保留不動，兩版共用同一份 `data.js`。

## 2. 技術架構

- 純 HTML / CSS / JavaScript，**沒有框架、套件、建置工具、後端或資料庫**。
- 檔案（都在根目錄，沒有子資料夾；另有 `.gitignore`）：
  - `index.html`：只有外框與 `<main id="app">`；**先載入 `data.js` 再載入 `app.js`**，順序不能顛倒。
  - `data.js`：所有內容，以全域常數提供：`tripData.days[]`（每天的 `places[]`，可用欄位見檔案開頭註解）、`flights`、`hotels`、`emergencyContacts`、`personalContacts`、`checklist`、`japanInsurance`、`entryForms`、`dialGuide`。
    - `flights`（航班）、`hotels`（住宿）和交通卡片的 `modes` 欄位（例如 `["電車", "巴士"]`）只有新版會讀，舊版會忽略。
  - `app.js`：hash 路由（`showPage()` 監聽 `hashchange`），每個畫面一個 `renderXxx()`，用模板字串組 HTML 後塞進 `app.innerHTML`。
    - `#` → `renderHome`、`#day-N` → `renderDay`、`#emergency` → `renderEmergency`、`#checklist` → `renderChecklist`、`#insurance` → `renderInsurance`、`#entry-forms` → `renderEntryForms`。新增畫面要同時改 `showPage()` 和首頁按鈕。
    - 地點卡片用原生 `<details>/<summary>` 展開；`renderPlaceDetail` 只顯示有值的欄位。
  - `style.css`：手機優先，`main` 最大寬 720px。
- 新增地點類型要同時改三處：`data.js` 開頭註解、`app.js` 的 `typeInfo`、`style.css` 的 `.type-<type>` 顏色。新版另外要改 `new-app.js` 的 `typeInfo`（顏色用 `bg-coral`／`bg-yellow`／`bg-mizu`／`bg-green`）。
- **新版網站**（舊版的檔案完全不動）：
  - `new.html`：頂端固定選單（`.top-nav`，每顆按鈕有 `data-page`），載入 Google Fonts 的 Huninn 字型；一樣**先載入 `data.js` 再載入 `new-app.js`**。
  - `new-app.js`：寫法和 `app.js` 一樣（hash 路由、`renderXxx()`）。`#` → `renderHome`（SVG 插圖、出發倒數、航班卡片、Day 按鈕）、`#day-N` → `renderDay`（上方日期切換、下方時間軸）、`#hotels` → `renderHotels`；`#checklist`、`#emergency`、`#insurance`、`#entry-forms` 目前還是 `renderPlaceholder`（製作中）。`highlightNav()` 負責把目前那頁的選單按鈕變黃。新增交通方式要改 `modeInfo`。
    - SVG 插圖寫在 `homeIllustration()`、`planeIllustration()`，顏色用 `var(--coral)` 等 CSS 變數。
  - `new-style.css`：顏色、框線粗細、圓角都定義在最上面的 `:root` 變數；動畫用 `anim-sway`／`anim-float`／`anim-snow`／`bounce`，最下面的 `@media (prefers-reduced-motion: reduce)` 會停掉所有動畫。

## 3. 如何啟動

- 不需要安裝任何東西，沒有執行指令。用瀏覽器直接打開 `index.html`（新版是 `new.html`）即可（Windows：在檔案總管雙擊；Mac：`open index.html`）。
- 檢查 JS 錯誤：在瀏覽器按 F12 打開開發者工具，看 Console 有沒有紅字（Windows／Mac 都適用）。
- 只有 Mac 可用的語法檢查：`osascript -l JavaScript data.js`，沒有輸出就是正確。
- 部署：`git add` → `git commit` → `git push origin main`，推送後約 1～2 分鐘網站更新。推送前先列出改了哪些檔案，等使用者確認。
  - `.DS_Store`（Mac 系統檔）已寫在 `.gitignore`，不會上傳。
  - git 作者只設在這個 repo：`chang5689` ／ `chang5689@users.noreply.github.com`（repo 是公開的，不要用真實 email）。
  - 2026/11/13 起，Mac 的鑰匙圈已存了 GitHub 細緻權杖（只限 `aomori-trip` 這個 repo），Claude 可以直接 `git push origin main`。
  - 若推送又要求登入（權杖過期、或換到 Windows 電腦）：Claude 的終端機和 `!` 指令都無法輸入帳密，請使用者開**另一個**終端機視窗自己推送，Username 填 `chang5689`、Password 貼權杖。**權杖絕對不要貼進對話裡**。

## 4. 目前進度

已完成並部署：
- 首頁：每天一張日期卡片，加上「緊急聯絡」「行前清單」「日本保險」「入境表格」按鈕（一排兩顆），以及「🚃 查電車（NAVITIME）」按鈕（2026/11/13，連到 `https://japantravel.navitime.com/zh-tw/area/jp/route/`，新分頁打開）。
- 每日行程頁：地點卡片點開看詳細說明、小提醒、地址；電話可直接撥號，另有 Google Maps 按鈕。
- 緊急聯絡頁：日本報警／救護、駐日代表處、訪日旅客熱線（2026/10/06 查詢，附官方來源）＋自己填的聯絡欄位。
- 行前清單：分類打勾、進度條、全部取消；勾選狀態存在 `localStorage`（key `aomori-checklist`）。
- 日本保險頁（`#insurance`，2026/11/12 完成）：東京海上日動投保連結與步驟，資料在 `data.js` 的 `japanInsurance`。使用者只要放連結，不要寫保障內容或費用。官網會擋程式讀取（403），無法自動查證。另有一份台灣買的保險，行前清單寫成「台灣旅遊保險」，兩者不要混淆。
- 入境表格範例頁（`#entry-forms`，2026/11/12 完成）：入境卡、海關申報單逐欄範例，資料在 `data.js` 的 `entryForms`，欄位照官方 PDF。只用假資料（WANG XIAOMING），不放真實姓名和護照號碼。日本有入境卡改版草案（2026/10/29），頁面註明以現場表格為準。
- Day 5 已改成八食中心 → （備用）蕪嶋神社 → 回青森 → 聖誕市集（晚餐）→ 約 19:00 煙火。
- 緊急聯絡頁新增「📞 怎麼撥打」（資料在 `data.js` 的 `dialGuide`）與代表處 24 小時專線 03-3280-7917，2026/11/12 查證。Skype 已於 2025/5/5 停止服務、LINE Out 現況無法查證，不要寫進頁面；03-3280-7811 是代表處辦公室總機，不是急難專線。
- 航班（使用者提供）：去程長榮 BR122，12/20 桃園 09:55 → 青森 14:20；回程 BR121，12/25 青森 15:30 → 桃園 19:00（都是當地時間）。Day 1 抵達時間已改成 14:20。

新版網站（`new.html`）已完成並推送（2026/11/14，commit `5d057cd`）：
- 第 1 步：`data.js` 新增 `flights`。
- 第 2 步：骨架＋頂端固定選單（首頁、行程、住宿、清單、緊急、保險、入境、查電車）。
- 第 3 步：首頁（雪山、蘋果、金魚睡魔燈籠、飄雪的 SVG 插圖，出發倒數，航班卡片，Day 1～6 按鈕）。
- 第 4 步：每日行程（日期切換列、時間軸、切換時彈跳、交通方式彩色標籤 `modes`）。
- 第 5 步：住宿頁（`data.js` 新增 `hotels`，三間飯店各一張卡片）。
- 使用者已決定：**不做**「必去」標籤；清單**維持一份**行前清單，不拆成待辦／行李清單。

## 5. 待辦事項

第 1 項是目前進行中的工作；第 2 項等使用者提供班次；其餘照提出的順序排列，開始做之前先請使用者確認。

1. **新版網站剩下的步驟**（使用者說「繼續做新版」就從第 6 步開始，一次一步）
   - 第 6 步：把行前清單（**沿用 localStorage key `aomori-checklist`**，打勾紀錄和舊版共用）、緊急聯絡、日本保險、入境表格搬到新版，換掉 `renderPlaceholder`。內容沿用 `data.js`，可參考 `app.js` 的對應函式。
   - 第 7 步：其餘 SVG 插圖和動畫：各天的插圖（**Day 4 使用者指定弘前城**；Day 1～2 青森站和巴士、Day 3 奧入瀨溪流、Day 5 聖誕樹／煙火／海鷗、Day 6 蘋果和 A-FACTORY）、住宿頁的溫泉熱氣。不畫航空公司標誌；睡魔類造型自己畫，不照抄真實作品。
   - 全部完成後，問使用者要不要把新版改成首頁（`index.html`）。
2. **Day 5（12/24）剩下的時間**：去程 A/B、回程 C～F 四班都已列在卡片上（使用者要求全部列出，不必選定）。蕪嶋神社是「（備用）」，不一定會去。還缺：八戶站 ↔ 鮫站的 JR 八戶線班次、八食 150 日圓巴士的發車時刻。NAVITIME 會擋程式讀取（403），班次要請使用者截圖提供。
3. 把範例行程換成實際行程：Day 3 的「奧入瀨溪流 冬季散步」「飯店溫泉放鬆」還標著 `sample: true`。
4. 填入 `personalContacts`：旅遊保險、信用卡掛失目前空白（住宿電話已填）。
5. **日本退稅新制注意事項頁**（以下內容由使用者提供，實作時查官方來源確認並附網址）
   - 2026/11/1 起改為「退款方式」：購物時先付含稅價，出境時經海關確認後才退稅。
   - 一定要在託運行李前辦海關確認。
   - 青森機場不能用 VJW 手機辦理，要用機場的免稅手續端機。
   - 以一張收據為單位確認，同一張收據少帶一件商品，整張都不退。
   - 出境日需在購買日起 90 天內；部分店家會收退稅手續費。
6. **常去店家使用的退稅公司頁**
   - 列出唐吉訶德、藥妝店、百貨公司等，各自配合哪家退稅公司、是否收手續費（唐吉訶德所屬的 PPIH 集團已宣布免收手續費）。
   - 實作前先請使用者列出實際會去的店，只查那幾家。

## 6. 已知問題與注意事項

- 資料用 `innerHTML` 直接插入、沒有跳脫：`data.js` 的文字不要含 `<`、`"`；清單項目尤其要注意（會放進 `data-item="..."` 屬性）。
- 清單打勾狀態以「項目文字」當 key，改項目名稱會讓該項變回未勾選。
- 地點的 `type` 若不在 `typeInfo` 裡，舊版 `renderDay` 會出錯（`info` 是 undefined）；新版會改用「景點」顯示，不會出錯。
- 飯店的電話、地址存在三個地方：`tripData` 的住宿卡片、`hotels`、`personalContacts`，有變動要三處一起改。
- 新版的 Huninn 字型要從網路下載；沒網路時會改用手機內建字型，內容照樣顯示。
- 用無頭 Chrome 截圖檢查時，視窗最窄只有 500px，比手機寬；手機上的實際樣子要請使用者自己確認。
- 緊急電話是 2026/10/06 查的，出發前要再確認一次。
- 打勾狀態只存在各自的手機瀏覽器，朋友之間不會同步。

## 7. 使用者偏好

- 一律用繁體中文回覆；程式註解、介面文字也用繁體中文。
- 一次只做一個步驟，並說明建立／修改了哪些檔案、為什麼；改完列出要推送的檔案，等使用者說可以再推。
- 改行程（`data.js`）或新增內容前，先列出計畫，等使用者確認再動手。
- 地址、電話、營業時間等不確定的資訊要先問或查證並附來源，不要猜。
- 註解寫得很詳細（使用者靠註解學習），新程式碼維持同樣的密度與口吻。
- 沿用現有寫法：`function` 宣告、`forEach(function () {...})`、模板字串、`#` 開頭的網址分頁；不引入框架或外部函式庫（新版唯一的外部資源是 Google Fonts 字型）。
- 舊版視覺風格：蘋果紅主色（`#c0392b`）、米白底色、卡片式版面、emoji 圖示；地點類型以卡片左邊框顏色區分。
- 新版視覺風格（日系繪本風，只用淺色底、平塗不用漸層）：和紙白底 `#FFFCF6`、墨灰 `#3E3A39` 3px 粗框、大圓角、實心墨色「貼紙」陰影；配色珊瑚粉 `#F2A497`、山吹黃 `#F6D27A`、水色 `#A8D3E6`、若竹綠 `#B9DAA5`；字型 Huninn；插圖用自己畫的 SVG，會輕輕動，並支援「減少動態效果」。

## 8. 環境設定

- 不需要 `.env`，目前沒有任何環境變數或 API 金鑰（純靜態網站，地圖只用一般的 Google Maps 搜尋連結）。
