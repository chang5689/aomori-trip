// =============================================
// 新版網站的程式（只給 new.html 用）
// 和舊版的 app.js 一樣，讀取 data.js 的資料，把它變成畫面。
// 舊版 app.js 不會被影響。
// =============================================

const app = document.getElementById("app");

// ---------------------------------------------
// 暫時的畫面：還沒做好的頁面先顯示「製作中」
// 之後每做好一頁，就換成真正的 renderXxx() 函式
// ---------------------------------------------
function renderPlaceholder(title, note) {
  app.innerHTML = `
    <h2 class="page-title">${title}</h2>
    <div class="card placeholder">
      <p>🚧 製作中</p>
      <p>${note}</p>
    </div>
  `;
  window.scrollTo(0, 0);
}

// =============================================
// 畫面 1：首頁（插圖＋標題＋出發倒數＋航班＋每日行程入口）
// =============================================
function renderHome() {
  // 第一天和最後一天的日期，例如「12/20（日） ～ 12/25（五）」
  const firstDay = tripData.days[0];
  const lastDay = tripData.days[tripData.days.length - 1];

  let html = `
    <section class="hero card">
      ${homeIllustration()}
      <h1 class="hero-title">${tripData.title}</h1>
      <p class="hero-date">${firstDay.date} ～ ${lastDay.date}</p>
      ${renderCountdown()}
    </section>

    <h2 class="section-title">✈️ 航班</h2>
    ${renderFlights()}

    <h2 class="section-title">🗓️ 每日行程</h2>
    <ul class="day-chips">
  `;

  // 每天一顆按鈕，點了跳到那天的行程
  // 四種顏色輪流用：index 是第幾個（從 0 開始），% 4 是「除以 4 的餘數」→ 0、1、2、3、0、1…
  const chipColors = ["coral", "yellow", "mizu", "green"];
  tripData.days.forEach(function (day, index) {
    html += `
      <li>
        <a class="day-chip bg-${chipColors[index % 4]}" href="#day-${day.day}">
          <span class="day-chip-number">Day ${day.day}</span>
          <span class="day-chip-date">${day.date}</span>
          <span class="day-chip-title">${day.title}</span>
        </a>
      </li>
    `;
  });

  html += "</ul>";
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

// ---------------------------------------------
// 出發倒數
// 依照「今天」和出發日（data.js 的 tripData.startDate）計算：
//   出發前   → 還有 N 天出發
//   出發當天 → 今天出發！
//   旅行中   → 旅程第 N 天
//   回來以後 → 旅程結束
// ---------------------------------------------
function renderCountdown() {
  // "2026-12-20" 用 - 切開 → ["2026", "12", "20"]，再轉成數字
  const parts = tripData.startDate.split("-").map(Number);
  // 注意：JavaScript 的月份從 0 開始算，所以 12 月要寫 11
  const start = new Date(parts[0], parts[1] - 1, parts[2]);

  // 今天的「日期」：把時、分、秒都歸零，只比較日期
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 兩個日期相減得到「毫秒」，除以一天的毫秒數（1000 毫秒 × 60 秒 × 60 分 × 24 小時）就是天數
  // Math.round 四捨五入，避免日光節約時間造成的小誤差
  const diffDays = Math.round((start - today) / (1000 * 60 * 60 * 24));
  const totalDays = tripData.days.length;

  let label;
  let number;
  if (diffDays > 0) {
    label = "距離出發還有";
    number = `${diffDays}<small> 天</small>`;
  } else if (diffDays === 0) {
    label = "就是今天！";
    number = "出發囉 ✈️";
  } else if (-diffDays < totalDays) {
    // diffDays 是負的，例如出發後第 2 天是 -1，所以「第幾天」= -diffDays + 1
    label = "旅程進行中";
    number = `第 ${-diffDays + 1}<small> 天</small>`;
  } else {
    label = "旅程結束";
    number = "歡迎回家 🏠";
  }

  return `
    <div class="countdown">
      <p class="countdown-label">${label}</p>
      <p class="countdown-number">${number}</p>
    </div>
  `;
}

// ---------------------------------------------
// 航班卡片：資料在 data.js 的 flights
// ---------------------------------------------
function renderFlights() {
  let html = "";

  flights.forEach(function (flight) {
    html += `
      <div class="card flight-card">
        <div class="flight-top">
          <span class="tag bg-yellow">${flight.label}</span>
          <span class="flight-no">${flight.airline} ${flight.flightNo}</span>
          <span class="flight-date">${flight.date}</span>
        </div>
        <div class="flight-route">
          <div class="flight-point">
            <p class="flight-time">${flight.departTime}</p>
            <p class="flight-place">${flight.from}</p>
          </div>
          <div class="flight-line">${planeIllustration()}</div>
          <div class="flight-point">
            <p class="flight-time">${flight.arriveTime}</p>
            <p class="flight-place">${flight.to}</p>
          </div>
        </div>
      </div>
    `;
  });

  html += "<p class=\"small-note\">⏰ 都是當地時間，日本比台灣快 1 小時。</p>";
  return html;
}

// =============================================
// 畫面 2：每日行程（上方切換日期，下方是時間軸）
// =============================================

// 每種地點類型的圖示、中文名稱、顏色（顏色名稱對應 new-style.css 的 bg-xxx）
const typeInfo = {
  transport: { icon: "🚃", label: "交通", color: "mizu" },
  spot: { icon: "📷", label: "景點", color: "green" },
  food: { icon: "🍴", label: "餐廳", color: "coral" },
  hotel: { icon: "🏨", label: "住宿", color: "yellow" }
};

// 交通方式的彩色小標籤
// data.js 的交通卡片可以加上 modes 欄位，例如 modes: ["電車", "巴士"]，
// 這裡就會依照名稱顯示對應的圖示和顏色。
const modeInfo = {
  "飛機": { icon: "✈️", color: "mizu" },
  "新幹線": { icon: "🚄", color: "coral" },
  "電車": { icon: "🚃", color: "green" },
  "巴士": { icon: "🚌", color: "yellow" },
  "接駁車": { icon: "🚐", color: "yellow" },
  "步行": { icon: "🚶", color: "white" }
};

function renderDay(dayNumber) {
  // 從 tripData 裡找出第 dayNumber 天的資料
  const day = tripData.days.find(function (d) {
    return d.day === dayNumber;
  });

  // 找不到（例如網址打錯）就回首頁
  if (!day) {
    renderHome();
    return;
  }

  let html = `
    ${renderDayTabs(dayNumber)}

    <!-- bounce：換日期時，這一整塊會彈跳出現（動畫在 new-style.css） -->
    <div class="bounce">
      <div class="card day-header">
        <span class="tag bg-yellow">Day ${day.day}・${day.date}</span>
        <h2 class="day-title">${day.title}</h2>
        <p class="day-area">📍 ${day.area}</p>
      </div>

      <ol class="timeline">
  `;

  day.places.forEach(function (place) {
    // 萬一 type 打錯、不在 typeInfo 裡，就當作「景點」，避免整頁出錯
    const info = typeInfo[place.type] || typeInfo.spot;
    // 範例行程加上「範例」小標籤
    const sampleTag = place.sample ? "<span class=\"tag bg-white\">範例</span>" : "";

    // 時間軸的每一格：左邊是圓點（類型圖示），右邊是可以點開的卡片
    //   <details>／<summary>：HTML 內建的「點一下展開、再點一下收合」
    html += `
      <li class="timeline-item">
        <span class="timeline-dot bg-${info.color}">${info.icon}</span>
        <details class="card place-card">
          <summary class="place-head">
            <div class="place-info">
              ${place.time ? `<p class="place-time">🕒 ${place.time}</p>` : ""}
              <h3 class="place-name">${place.name}</h3>
              <div class="place-tags">
                <span class="tag bg-${info.color}">${info.label}</span>
                ${renderModeTags(place.modes)}
                ${sampleTag}
              </div>
              ${place.summary ? `<p class="place-summary">${place.summary}</p>` : ""}
            </div>
            <span class="toggle-icon">▾</span>
          </summary>
          ${renderPlaceDetail(place)}
        </details>
      </li>
    `;
  });

  html += "</ol></div>";
  app.innerHTML = html;
  window.scrollTo(0, 0);

  // 手機上日期列可以左右滑；把選到的那天捲到看得到的地方
  const activeTab = document.querySelector(".day-tab.active");
  if (activeTab) {
    activeTab.scrollIntoView({ block: "nearest", inline: "center" });
  }
}

// 上方的日期切換列：每天一顆，選到的那天是山吹黃
function renderDayTabs(currentDay) {
  let html = "<nav class=\"day-tabs\">";

  tripData.days.forEach(function (day) {
    const activeClass = day.day === currentDay ? "active" : "";
    // 日期只取「12/20」，括號裡的星期另外放一行，按鈕比較窄
    //   split("（") 用全形括號切開：「12/20（日）」→ ["12/20", "日）"]
    const parts = day.date.split("（");
    const weekday = parts[1] ? parts[1].replace("）", "") : "";
    html += `
      <a class="day-tab ${activeClass}" href="#day-${day.day}">
        <span class="day-tab-number">Day ${day.day}</span>
        <span class="day-tab-date">${parts[0]}${weekday ? `（${weekday}）` : ""}</span>
      </a>
    `;
  });

  html += "</nav>";
  return html;
}

// 交通方式小標籤：沒有 modes 欄位就什麼都不顯示
function renderModeTags(modes) {
  if (!modes) {
    return "";
  }

  let html = "";
  modes.forEach(function (mode) {
    // 不在 modeInfo 裡的交通方式，用白底、不加圖示
    const info = modeInfo[mode] || { icon: "", color: "white" };
    html += `<span class="tag bg-${info.color}">${info.icon} ${mode}</span>`;
  });
  return html;
}

// ---------------------------------------------
// 地點卡片點開後的「詳細資訊」（從舊版 app.js 搬過來，改成新版樣式）
// 有資料的欄位才顯示，沒有的就跳過
// ---------------------------------------------
function renderPlaceDetail(place) {
  let html = "";

  if (place.detail) {
    html += `<p>${place.detail}</p>`;
  }

  if (place.tips) {
    html += `<p class="detail-tips">💡 ${place.tips}</p>`;
  }

  if (place.address) {
    html += `<p>🏠 ${place.address}</p>`;
  }

  // 按鈕區：電話和地圖
  let buttons = "";

  if (place.phone) {
    // tel: 開頭的連結，在手機上點了就會直接撥號
    buttons += `<a class="pill-button bg-green" href="tel:${place.phone}">📞 ${place.phone}</a>`;
  }

  if (place.mapQuery) {
    buttons += `<a class="pill-button bg-mizu" href="${googleMapsUrl(place.mapQuery)}" target="_blank" rel="noopener">🗺️ Google Maps</a>`;
  }

  if (buttons) {
    html += `<div class="detail-buttons">${buttons}</div>`;
  }

  // 什麼資料都沒有的話，顯示一句提示
  if (!html) {
    html = "<p class=\"small-note\">還沒有詳細資訊</p>";
  }

  return `<div class="place-detail">${html}</div>`;
}

// 把搜尋關鍵字變成 Google Maps 的網址（和舊版 app.js 一樣）
// encodeURIComponent 會把日文、空白等文字轉成網址可以用的格式
function googleMapsUrl(query) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

// =============================================
// 畫面 3：住宿資訊（資料在 data.js 的 hotels）
// =============================================
function renderHotels() {
  // 算出總共住幾晚：把每間飯店的 nights 加起來
  let totalNights = 0;
  hotels.forEach(function (hotel) {
    totalNights += hotel.nights;
  });

  let html = `
    <h2 class="page-title">🏨 住宿資訊</h2>
    <div class="card hotel-summary bg-yellow">
      共 <strong>${totalNights}</strong> 晚・<strong>${hotels.length}</strong> 間飯店
    </div>
  `;

  // 每間飯店的左邊色條用不同顏色，三間輪流用
  const colors = ["coral", "mizu", "green"];

  hotels.forEach(function (hotel, index) {
    // 按鈕：有電話才顯示撥號，有關鍵字才顯示地圖
    let buttons = "";
    if (hotel.phone) {
      buttons += `<a class="pill-button bg-green" href="tel:${hotel.phone}">📞 ${hotel.phone}</a>`;
    }
    if (hotel.mapQuery) {
      buttons += `<a class="pill-button bg-mizu" href="${googleMapsUrl(hotel.mapQuery)}" target="_blank" rel="noopener">🗺️ Google Maps</a>`;
    }
    buttons += `<a class="pill-button bg-white" href="#day-${hotel.day}">🗓️ 看 Day ${hotel.day} 行程</a>`;

    html += `
      <div class="card hotel-card stripe-${colors[index % colors.length]}">
        <span class="tag bg-${colors[index % colors.length]}">第 ${index + 1} 間・${hotel.nights} 晚</span>
        <h3 class="hotel-name">${hotel.name}</h3>
        <p class="hotel-dates">🛏️ ${hotel.checkIn} 入住 → ${hotel.checkOut} 退房</p>
        ${hotel.detail ? `<p>${hotel.detail}</p>` : ""}
        ${hotel.tips ? `<p class="detail-tips">💡 ${hotel.tips}</p>` : ""}
        ${hotel.address ? `<p>🏠 ${hotel.address}</p>` : ""}
        <div class="detail-buttons">${buttons}</div>
      </div>
    `;
  });

  // 外層包 bounce：進到這頁時一樣有彈跳效果
  app.innerHTML = `<div class="bounce">${html}</div>`;
  window.scrollTo(0, 0);
}

// =============================================
// SVG 插圖
// SVG 是「用程式碼畫圖」：圓形 circle、橢圓 ellipse、多邊形 polygon、
// 自由路徑 path… 每個形狀用座標決定位置。
//   viewBox="0 0 320 200"：畫布寬 320、高 200，螢幕大小不同時會自動等比例縮放
//   fill：填滿的顏色；stroke：框線顏色；stroke-width：框線粗細
// 顏色用 var(--coral) 這種寫法，直接拿 new-style.css 裡定義的顏色。
// class="anim-xxx" 是讓它動起來的動畫，定義在 new-style.css。
// =============================================

// 首頁大圖：雪山、紅蘋果、金魚睡魔燈籠、飄落的雪
//   金魚睡魔（金魚ねぶた）是青森睡魔祭常見的可愛金魚燈籠，
//   這裡是自己畫的簡單造型，不是照某一座真實作品畫的。
function homeIllustration() {
  return `
    <svg class="illust" viewBox="0 0 320 200" role="img" aria-label="雪山、紅蘋果和金魚燈籠的插圖">
      <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">

        <!-- 後面的兩座山（水色、若竹綠），山頂有白雪 -->
        <polygon points="20,160 110,55 200,160" fill="var(--mizu)" />
        <path d="M110,55 L88,81 L100,76 L110,86 L121,76 L132,81 Z" fill="white" />
        <polygon points="140,160 225,75 310,160" fill="var(--green)" />
        <path d="M225,75 L205,95 L216,91 L225,100 L235,91 L245,95 Z" fill="white" />

        <!-- 雪地：先畫白色地面（不畫框線），再沿著上緣畫一條起伏的線
             這樣框線只出現在雪地上緣，左右和下面不會多出方框 -->
        <path d="M0,158 Q80,140 160,156 T320,154 L320,200 L0,200 Z" fill="white" stroke="none" />
        <path d="M0,158 Q80,140 160,156 T320,154" fill="none" />

        <!-- 金魚睡魔燈籠（右上，掛在繩子上輕輕晃） -->
        <g class="anim-float">
          <line x1="250" y1="0" x2="250" y2="30" />
          <!-- 尾巴（山吹黃） -->
          <path d="M276,48 L300,32 L294,48 L300,64 Z" fill="var(--yellow)" />
          <!-- 身體（白色＋珊瑚粉花紋） -->
          <ellipse cx="250" cy="48" rx="30" ry="19" fill="white" />
          <!-- 身上的珊瑚粉圓點花紋（不畫框線） -->
          <circle cx="252" cy="40" r="7" fill="var(--coral)" stroke="none" />
          <circle cx="266" cy="52" r="5" fill="var(--coral)" stroke="none" />
          <circle cx="246" cy="56" r="4" fill="var(--coral)" stroke="none" />
          <!-- 眼睛和嘴巴 -->
          <circle cx="232" cy="44" r="3" fill="var(--ink)" stroke="none" />
          <path d="M222,53 Q226,56 229,53" fill="none" />
        </g>

        <!-- 紅蘋果（左下，輕輕左右搖） -->
        <g class="anim-sway">
          <circle cx="70" cy="150" r="27" fill="var(--coral)" />
          <!-- 蘋果上的小反光（白色、不畫框線） -->
          <ellipse cx="59" cy="140" rx="5" ry="8" fill="white" stroke="none" />
          <!-- 蒂頭和葉子 -->
          <path d="M70,124 Q71,114 76,109" fill="none" />
          <path d="M74,116 Q86,104 96,112 Q86,122 74,116 Z" fill="var(--green)" />
        </g>

        <!-- 第二顆小蘋果 -->
        <circle cx="118" cy="168" r="15" fill="var(--coral)" />
        <path d="M118,153 Q119,147 122,144" fill="none" />
      </g>

      <!-- 飄落的雪（水色小圓點），每顆的延遲時間不同，看起來比較自然 -->
      <g fill="var(--mizu)">
        <circle class="anim-snow" cx="40"  cy="20" r="4" style="animation-delay: 0s" />
        <circle class="anim-snow" cx="95"  cy="10" r="3" style="animation-delay: 1.2s" />
        <circle class="anim-snow" cx="160" cy="25" r="4" style="animation-delay: 2.4s" />
        <circle class="anim-snow" cx="195" cy="8"  r="3" style="animation-delay: 0.6s" />
        <circle class="anim-snow" cx="300" cy="90" r="3" style="animation-delay: 1.8s" />
        <circle class="anim-snow" cx="15"  cy="70" r="3" style="animation-delay: 3s" />
      </g>
    </svg>
  `;
}

// 航班卡片中間的小飛機（不畫航空公司標誌）
function planeIllustration() {
  return `
    <svg class="plane anim-float" viewBox="0 0 64 40" role="img" aria-label="飛機">
      <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <!-- 機翼（後面那片先畫，會被機身蓋住） -->
        <path d="M30,20 L22,4 L30,4 L42,20 Z" fill="var(--mizu)" />
        <!-- 機身 -->
        <path d="M6,20 Q6,14 14,14 L52,14 Q60,14 60,20 Q60,26 52,26 L14,26 Q6,26 6,20 Z" fill="white" />
        <!-- 尾翼 -->
        <path d="M8,15 L4,6 L11,6 L16,14 Z" fill="var(--coral)" />
        <!-- 前面那片機翼 -->
        <path d="M30,22 L22,37 L30,37 L42,22 Z" fill="var(--mizu)" />
        <!-- 窗戶 -->
        <circle cx="44" cy="19" r="1.5" fill="var(--ink)" stroke="none" />
        <circle cx="50" cy="19" r="1.5" fill="var(--ink)" stroke="none" />
      </g>
    </svg>
  `;
}

// ---------------------------------------------
// 把選單上「目前這一頁」的按鈕標成黃色
//   pageName 對應 new.html 裡每顆按鈕的 data-page
// ---------------------------------------------
function highlightNav(pageName) {
  document.querySelectorAll(".nav-list a").forEach(function (link) {
    // classList.toggle(名稱, 條件)：條件成立就加上 active，不成立就拿掉
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  // 手機上選單可以左右滑；把目前這顆按鈕捲到看得到的位置
  const activeLink = document.querySelector(".nav-list a.active");
  if (activeLink) {
    activeLink.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

// ---------------------------------------------
// 依照網址決定要顯示哪個畫面（和舊版一樣用 # 分頁）
//   #             → 首頁
//   #day-3        → 第 3 天的行程
//   #hotels       → 住宿資訊
//   #checklist    → 行前清單
//   #emergency    → 緊急聯絡
//   #insurance    → 日本保險
//   #entry-forms  → 入境表格
// ---------------------------------------------
function showPage() {
  const hash = window.location.hash; // 例如 "#day-3"

  if (hash.startsWith("#day-")) {
    highlightNav("day");
    const dayNumber = Number(hash.replace("#day-", "")); // "#day-3" → 3
    renderDay(dayNumber);
  } else if (hash === "#hotels") {
    highlightNav("hotels");
    renderHotels();
  } else if (hash === "#checklist") {
    highlightNav("checklist");
    renderPlaceholder("✅ 行前清單", "第 6 步會做，打勾紀錄和舊版共用。");
  } else if (hash === "#emergency") {
    highlightNav("emergency");
    renderPlaceholder("🆘 緊急聯絡", "第 6 步會做。");
  } else if (hash === "#insurance") {
    highlightNav("insurance");
    renderPlaceholder("🛡️ 日本保險", "第 6 步會做。");
  } else if (hash === "#entry-forms") {
    highlightNav("entry-forms");
    renderPlaceholder("📝 入境表格", "第 6 步會做。");
  } else {
    highlightNav("home");
    renderHome();
  }
}

// 網址的 # 改變時（點選單、按返回鍵），重新決定畫面
window.addEventListener("hashchange", showPage);

// 網頁一打開，先顯示一次
showPage();
