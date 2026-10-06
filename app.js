// 這個檔案負責網頁的「動作」與「內容產生」。
// 它會讀取 data.js 裡的 tripData，把資料變成網頁上看得到的畫面。

const app = document.getElementById("app");

// 每種類型對應的圖示和中文名稱
const typeInfo = {
  transport: { icon: "🚃", label: "交通" },
  spot: { icon: "📷", label: "景點" },
  food: { icon: "🍴", label: "餐廳" },
  hotel: { icon: "🏨", label: "住宿" }
};

// ---------------------------------------------
// 畫面 1：行程首頁（每天一張日期卡片）
// ---------------------------------------------
function renderHome() {
  // 最上面放緊急聯絡按鈕，遇到狀況時第一眼就找得到
  let html = "<a class=\"emergency-button\" href=\"#emergency\">🆘 緊急聯絡資訊</a>";
  html += "<h2 class=\"section-title\">每日行程</h2>";
  html += "<ul class=\"day-list\">";

  tripData.days.forEach(function (day) {
    // 整張卡片是一個連結，點了網址會變成 #day-1、#day-2 ...
    html += `
      <li>
        <a class="day-card" href="#day-${day.day}">
          <div class="day-badge">
            <span class="day-number">Day ${day.day}</span>
            <span class="day-date">${day.date}</span>
          </div>
          <div class="day-info">
            <h3 class="day-title">${day.title}</h3>
            <p class="day-area">📍 ${day.area}</p>
            <p class="day-count">${day.places.length} 個行程</p>
          </div>
          <span class="arrow">›</span>
        </a>
      </li>
    `;
  });

  html += "</ul>";
  app.innerHTML = html;
}

// ---------------------------------------------
// 畫面 2：每日行程頁（當天的每個地點一張卡片）
// ---------------------------------------------
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
    <a class="back-link" href="#">‹ 回到首頁</a>
    <div class="day-header">
      <span class="day-header-badge">Day ${day.day}・${day.date}</span>
      <h2>${day.title}</h2>
      <p>📍 ${day.area}</p>
    </div>
    <ul class="place-list">
  `;

  day.places.forEach(function (place) {
    const info = typeInfo[place.type];
    // 範例行程加上「範例」小標籤
    const sampleTag = place.sample ? "<span class=\"tag-sample\">範例</span>" : "";

    // <details> 是 HTML 內建的「點一下展開、再點一下收合」元件
    //   <summary> 裡面是平常看得到的部分
    //   其他內容要點開才看得到
    html += `
      <li>
        <details class="place-card type-${place.type}">
          <summary class="place-head">
            <div class="place-icon">${info.icon}</div>
            <div class="place-info">
              <p class="place-time">${place.time || ""}</p>
              <h3 class="place-name">${place.name} ${sampleTag}</h3>
              <p class="place-summary">${place.summary || ""}</p>
            </div>
            <span class="toggle-icon">▾</span>
          </summary>
          ${renderPlaceDetail(place)}
        </details>
      </li>
    `;
  });

  html += "</ul>";
  app.innerHTML = html;

  // 換頁後捲回最上面
  window.scrollTo(0, 0);
}

// ---------------------------------------------
// 畫面 3：緊急聯絡資訊
// ---------------------------------------------
function renderEmergency() {
  let html = `
    <a class="back-link" href="#">‹ 回到首頁</a>
    <h2 class="section-title">🆘 緊急聯絡資訊</h2>
    <p class="emergency-note">點電話號碼就能直接撥打。號碼查詢日期：2026/10/06，出發前請點「官方來源」再確認一次。</p>
    <ul class="contact-list">
  `;

  // 查好的緊急電話
  emergencyContacts.forEach(function (contact) {
    html += `
      <li class="contact-card">
        <h3 class="contact-name">${contact.name}</h3>
        <a class="contact-phone" href="tel:${contact.phone}">📞 ${contact.phone}</a>
        <p class="contact-note">${contact.note}</p>
        <a class="contact-source" href="${contact.source}" target="_blank">官方來源 ↗</a>
      </li>
    `;
  });

  html += "</ul>";

  // 自己填的欄位
  html += "<h2 class=\"section-title\">📝 我的聯絡資訊</h2>";
  html += "<ul class=\"contact-list\">";

  personalContacts.forEach(function (contact) {
    // 有填電話就顯示撥號按鈕，沒填就顯示灰色的「尚未填寫」
    let phoneHtml;
    if (contact.phone) {
      phoneHtml = `<a class="contact-phone" href="tel:${contact.phone}">📞 ${contact.phone}</a>`;
    } else {
      phoneHtml = "<p class=\"contact-empty\">尚未填寫（請到 data.js 的 personalContacts 填入）</p>";
    }

    html += `
      <li class="contact-card">
        <h3 class="contact-name">${contact.name}</h3>
        ${phoneHtml}
        ${contact.note ? `<p class="contact-note">${contact.note}</p>` : ""}
      </li>
    `;
  });

  html += "</ul>";
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

// ---------------------------------------------
// 地點卡片點開後的「詳細資訊」
// 有資料的欄位才顯示，沒有的就跳過
// ---------------------------------------------
function renderPlaceDetail(place) {
  let html = "<div class=\"place-detail\">";

  if (place.detail) {
    html += `<p>${place.detail}</p>`;
  }

  if (place.tips) {
    html += `<p class="detail-tips">💡 ${place.tips}</p>`;
  }

  if (place.address) {
    html += `<p class="detail-row">🏠 ${place.address}</p>`;
  }

  // 按鈕區：電話和地圖
  let buttons = "";

  if (place.phone) {
    // tel: 開頭的連結，在手機上點了就會直接撥號
    buttons += `<a class="btn btn-phone" href="tel:${place.phone}">📞 ${place.phone}</a>`;
  }

  if (place.mapQuery) {
    buttons += `<a class="btn btn-map" href="${googleMapsUrl(place.mapQuery)}" target="_blank">🗺️ Google Maps</a>`;
  }

  if (buttons) {
    html += `<div class="detail-buttons">${buttons}</div>`;
  }

  // 什麼資料都沒有的話，顯示一句提示
  if (html === "<div class=\"place-detail\">") {
    html += "<p class=\"detail-empty\">還沒有詳細資訊</p>";
  }

  html += "</div>";
  return html;
}

// 把搜尋關鍵字變成 Google Maps 的網址
// encodeURIComponent 會把日文、空白等文字轉成網址可以用的格式
function googleMapsUrl(query) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

// ---------------------------------------------
// 依照網址決定要顯示哪個畫面
//   網址結尾是 #day-3      → 顯示第 3 天
//   網址結尾是 #emergency  → 顯示緊急聯絡資訊
//   沒有 # 或其他          → 顯示首頁
// ---------------------------------------------
function showPage() {
  const hash = window.location.hash; // 例如 "#day-3"

  if (hash === "#emergency") {
    renderEmergency();
  } else if (hash.startsWith("#day-")) {
    const dayNumber = Number(hash.replace("#day-", "")); // 取出數字 3
    renderDay(dayNumber);
  } else {
    renderHome();
  }
}

// 網址的 # 改變時（點卡片、按返回鍵），重新決定畫面
window.addEventListener("hashchange", showPage);

// 網頁一打開，先顯示一次
showPage();
