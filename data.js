// =============================================
// 青森六天五夜：行程資料
// 想修改行程，只要改這個檔案就好，不用動其他程式。
// =============================================
//
// 每個地點(place)可用的欄位：
//   name      名稱（必填）
//   type      類型："transport" 交通、"spot" 景點、"food" 餐廳/咖啡、"hotel" 住宿
//   time      預計時間
//   summary   一句話簡介（顯示在卡片上）
//   detail    詳細說明（點開卡片後才看到）
//   tips      小提醒
//   address   地址
//   phone     電話
//   mapQuery  用來搜尋 Google Maps 的關鍵字（日文名稱最準）
//   sample    設為 true 代表這是「範例」，之後要換成你自己的行程

const tripData = {
  title: "青森六天五夜",
  startDate: "2026-12-20",
  days: [
    // ---------- 第 1 天 ----------
    {
      day: 1,
      date: "12/20（日）",
      title: "抵達青森",
      area: "青森市",
      places: [
        {
          name: "抵達青森機場",
          type: "transport",
          time: "14:30",
          summary: "飛機抵達青森機場（日本時間）",
          detail: "出關後前往機場巴士站，搭乘往青森市區的接駁巴士。",
          tips: "12 月的青森可能已經下雪，下飛機前先把外套準備好。",
          mapQuery: "青森空港"
        },
        {
          name: "機場接駁巴士 → 青森市區",
          type: "transport",
          time: "約 16:00 抵達",
          summary: "搭接駁巴士到青森市區",
          detail: "從青森機場搭巴士前往青森站方向，車程大約 35～40 分鐘。",
          tips: "下雪時路況可能延誤，抵達時間抓寬鬆一點。",
          mapQuery: "青森駅"
        },
        {
          name: "大和 Roynet 飯店 青森",
          type: "hotel",
          time: "16:00 入住",
          summary: "第 1 晚住宿",
          detail: "Daiwa Roynet Hotel Aomori（ダイワロイネットホテル青森），從 JR 青森站步行約 5 分鐘。",
          tips: "第 2 天早上可以把行李寄放在櫃檯。",
          address: "青森県青森市新町1-11-16",
          phone: "017-732-7380",
          mapQuery: "ダイワロイネットホテル青森"
        }
      ]
    },

    // ---------- 第 2 天 ----------
    {
      day: 2,
      date: "12/21（一）",
      title: "青森市區散步 → 奧入瀨",
      area: "青森市 → 奧入瀨",
      places: [
        {
          name: "整理行李、寄放櫃檯",
          type: "hotel",
          time: "早上",
          summary: "退房後把行李寄放在大和 Roynet 飯店櫃檯",
          detail: "先輕裝出門逛逛，中午過後再回飯店拿行李。",
          tips: "記得拿行李寄放的號碼牌。",
          address: "青森県青森市新町1-11-16",
          phone: "017-732-7380",
          mapQuery: "ダイワロイネットホテル青森"
        },
        {
          name: "廣田神社",
          type: "spot",
          time: "上午",
          summary: "青森市區的神社，順便在附近散步",
          detail: "位於青森市區，從飯店走得到。可以參拜，也可以在附近隨意逛逛。",
          tips: "冬天地面可能結冰，走路小心。",
          mapQuery: "廣田神社 青森"
        },
        {
          name: "回飯店拿行李",
          type: "hotel",
          time: "中午前後",
          summary: "回大和 Roynet 飯店領取寄放的行李",
          detail: "拿好行李後，步行往青森車站，途中會經過 Coffee Marron。",
          tips: "",
          address: "青森県青森市新町1-11-16",
          phone: "017-732-7380",
          mapQuery: "ダイワロイネットホテル青森"
        },
        {
          name: "Coffee Marron",
          type: "food",
          time: "停留 1～2 小時",
          summary: "往車站途中的咖啡廳",
          detail: "在搭接駁車前悠閒地喝杯咖啡休息一下。",
          tips: "注意時間！14:30 前要到青森站。",
          mapQuery: "Coffee Marron 青森"
        },
        {
          name: "青森站 → 奧入瀨 接駁車",
          type: "transport",
          time: "14:30 集合／15:00 發車",
          summary: "一天只有一班，千萬不能錯過！",
          detail: "從青森站搭乘前往星野集團奧入瀨溪流飯店的接駁車。",
          tips: "⚠️ 一天只有一班，15:00 發車，需在 14:30 前抵達。",
          mapQuery: "青森駅"
        },
        {
          name: "星野集團 奧入瀨溪流飯店",
          type: "hotel",
          time: "傍晚入住",
          summary: "第 2、3 晚住宿",
          detail: "Hoshino Resorts Oirase Keiryu Hotel（星野リゾート 奥入瀬渓流ホテル），就在奧入瀨溪流旁邊的溫泉飯店。",
          tips: "連住兩晚。",
          address: "青森県十和田市奥瀬字栃久保231",
          phone: "0570-073-022",
          mapQuery: "星野リゾート 奥入瀬渓流ホテル"
        }
      ]
    },

    // ---------- 第 3 天 ----------
    {
      day: 3,
      date: "12/22（二）",
      title: "奧入瀨溪流",
      area: "奧入瀨",
      places: [
        {
          name: "奧入瀨溪流 冬季散步",
          type: "spot",
          time: "上午",
          summary: "（範例）欣賞雪景中的溪流",
          detail: "冬天的奧入瀨溪流被白雪覆蓋，部分瀑布會結成冰瀑，景色和其他季節完全不同。",
          tips: "穿防滑的鞋子。可以詢問飯店有沒有冬季導覽行程。",
          mapQuery: "奥入瀬渓流",
          sample: true
        },
        {
          name: "飯店溫泉放鬆",
          type: "hotel",
          time: "下午～晚上",
          summary: "（範例）在飯店泡溫泉、休息",
          detail: "冬天天黑得早，下午就可以回飯店泡溫泉。",
          tips: "",
          address: "青森県十和田市奥瀬字栃久保231",
          phone: "0570-073-022",
          mapQuery: "星野リゾート 奥入瀬渓流ホテル",
          sample: true
        }
      ]
    },

    // ---------- 第 4 天 ----------
    {
      day: 4,
      date: "12/23（三）",
      title: "回青森市區・弘前城",
      area: "奧入瀨 → 青森市 → 弘前",
      places: [
        {
          name: "奧入瀨 → 青森車站 接駁車",
          type: "transport",
          time: "10:30 出發",
          summary: "搭飯店接駁車回青森市區，在青森車站下車",
          detail: "從奧入瀨溪流飯店搭接駁車，在青森車站下車。網路資料寫車程約 1.5～2 小時，實際抵達時間請向飯店確認。",
          tips: "下車後直接去吃午餐。",
          mapQuery: "青森駅"
        },
        {
          name: "味の札幌 大西",
          type: "food",
          time: "午餐",
          summary: "青森名物：味噌咖哩牛奶拉麵",
          detail: "青森市的人氣拉麵店，招牌是味噌、咖哩加牛奶的特殊湯頭。",
          tips: "用餐時間可能要排隊。",
          mapQuery: "味の札幌 大西"
        },
        {
          name: "ReLabo Medical Spa & Stay",
          type: "hotel",
          time: "午餐後",
          summary: "第 4、5 晚住宿（先寄放行李）",
          detail: "位於青森市區的健康主題飯店。吃完午餐後先放行李，再出發去弘前。",
          tips: "連住兩晚。",
          address: "青森県青森市柳川1-1-5",
          phone: "017-762-0151",
          mapQuery: "ReLabo Medical Spa&Stay 青森"
        },
        {
          name: "青森站 → 弘前城",
          type: "transport",
          time: "下午",
          summary: "JR 奧羽本線到弘前站，再轉巴士",
          detail: "從青森站搭 JR 奧羽本線到弘前站，約 45 分鐘。弘前站前搭巴士到弘前公園一帶，約 10 分鐘。",
          tips: "12 月下旬大約 16:15 日落，時間太趕的話改去睡魔之家（備案）。",
          mapQuery: "弘前駅"
        },
        {
          name: "弘前城",
          type: "spot",
          time: "下午",
          summary: "日本現存 12 座天守之一",
          detail: "位於弘前公園內，冬天可以看到雪中的城郭。",
          tips: "",
          mapQuery: "弘前城"
        },
        {
          name: "【備案】睡魔之家 WA-RASSE",
          type: "spot",
          time: "下午（備案）",
          summary: "去弘前太趕的話，改來這裡",
          detail: "就在青森站旁邊，展示青森睡魔祭實際使用過的大型燈籠，可以感受祭典氣氛。",
          tips: "需要門票，建議預留 1 小時。",
          mapQuery: "ねぶたの家 ワ・ラッセ"
        },
        {
          name: "【晚餐二選一】焼肉 南大門 新町店",
          type: "food",
          time: "晚餐",
          summary: "青森站步行約 3 分鐘的老字號燒肉店",
          detail: "營業將近 30 年的燒肉店，有多種牛五花（カルビ），石鍋拌飯也很有名。營業時間：週一～四 11:00～22:00（最後點餐 21:30）、週五～六 11:00～23:00（最後點餐 22:30）。",
          tips: "無公休。資料來源：食べログ。",
          address: "青森県青森市新町1-8-3",
          phone: "017-777-2377",
          mapQuery: "焼肉 南大門 新町店 青森"
        },
        {
          name: "【晚餐二選一】焼肉 にくみつ",
          type: "food",
          time: "晚餐",
          summary: "青森市區的燒肉店，營業到深夜",
          detail: "營業時間：17:00～03:00。可以預約，也可以刷卡，有包廂。",
          tips: "每天營業。資料來源：食べログ。",
          address: "青森県青森市本町1-6-9",
          phone: "017-718-0087",
          mapQuery: "焼肉 にくみつ 青森"
        }
      ]
    },

    // ---------- 第 5 天 ----------
    {
      day: 5,
      date: "12/24（四）",
      title: "八戶一日遊",
      area: "青森市 → 八戶 → 青森市",
      places: [
        {
          name: "青森站 → 新青森站",
          type: "transport",
          time: "5:41 → 5:45",
          summary: "JR 奧羽本線首班車",
          detail: "從青森站搭最早一班 JR 奧羽本線，5:41 出發，5:45 抵達新青森站。",
          tips: "新幹線不停青森站，要先到「新青森站」。很早出發，前一晚先準備好。",
          mapQuery: "青森駅"
        },
        {
          name: "新青森站 → 八戶站",
          type: "transport",
          time: "6:18 → 6:41",
          summary: "東北新幹線",
          detail: "從新青森站搭東北新幹線，6:18 出發，6:41 抵達八戶站。",
          tips: "",
          mapQuery: "新青森駅"
        },
        {
          name: "八戶站 → 陸奧湊站",
          type: "transport",
          time: "7:08 → 7:24",
          summary: "JR 八戶線",
          detail: "在八戶站轉乘 JR 八戶線，7:08 出發，7:24 抵達陸奧湊站。",
          tips: "八戶站有大約 27 分鐘的轉車時間。",
          mapQuery: "八戸駅"
        },
        {
          name: "陸奧湊站前早市",
          type: "food",
          time: "早餐",
          summary: "車站前的早市，吃海鮮早餐",
          detail: "就在陸奧湊站前。市場大約 3:00～14:00，食堂大約 6:00～10:00。",
          tips: "週日休息（12/24 是週四，有營業）。",
          mapQuery: "陸奥湊駅前朝市"
        },
        {
          name: "陸奧湊站 → 蕪嶋神社",
          type: "transport",
          time: "早餐後",
          summary: "JR 八戶線到鮫站，步行約 15 分鐘",
          detail: "從陸奧湊站搭 JR 八戶線往鮫方向，在鮫站下車，再步行約 15 分鐘到蕪嶋神社。",
          tips: "",
          mapQuery: "鮫駅"
        },
        {
          name: "蕪嶋神社",
          type: "spot",
          time: "上午",
          summary: "海邊小島上的神社",
          detail: "位於海邊的蕪島上，可以眺望海景。",
          tips: "10～3 月參拜時間 8:45～16:50。",
          address: "青森県八戸市鮫町鮫56-2",
          mapQuery: "蕪嶋神社"
        },
        {
          name: "鮫站 → 八戶站 → 八食中心",
          type: "transport",
          time: "中午前",
          summary: "JR 八戶線回八戶站，再轉 100 日圓巴士",
          detail: "從鮫站搭 JR 八戶線回八戶站，再搭八戶站往八食中心的 100 日圓巴士。",
          tips: "100 日圓巴士 9:00～16:00，大約每小時一班。",
          mapQuery: "八戸駅"
        },
        {
          name: "八食中心",
          type: "food",
          time: "午餐",
          summary: "大型海鮮市場，吃海鮮午餐",
          detail: "市場內有很多海鮮攤位和食堂。市場棟營業時間 9:00～18:00。",
          tips: "週三休息（12/24 是週四，有營業）。",
          mapQuery: "八食センター"
        },
        {
          name: "八食中心 → Hacchi",
          type: "transport",
          time: "午餐後",
          summary: "（交通方式待確認）",
          detail: "",
          tips: "",
          mapQuery: "八戸ポータルミュージアム はっち"
        },
        {
          name: "八戶 Portal Museum Hacchi",
          type: "spot",
          time: "下午",
          summary: "八戶市中心的文化觀光設施，免費入館",
          detail: "介紹八戶的文化與工藝，也有展示和小店可以逛。開館時間 9:00～21:00。",
          tips: "週二休館（12/24 是週四，有開）。",
          address: "青森県八戸市三日町11-1",
          phone: "0178-22-8228",
          mapQuery: "八戸ポータルミュージアム はっち"
        },
        {
          name: "八戶 → 青森市區",
          type: "transport",
          time: "傍晚",
          summary: "新幹線回新青森站，再轉 JR 到青森站",
          detail: "從八戶站搭東北新幹線到新青森站，再轉 JR 奧羽本線到青森站。",
          tips: "",
          mapQuery: "八戸駅"
        },
        {
          name: "晚餐（青森市區）",
          type: "food",
          time: "晚餐",
          summary: "青森市區解決，店家未定",
          detail: "",
          tips: ""
        },
        {
          name: "ReLabo Medical Spa & Stay",
          type: "hotel",
          time: "晚上",
          summary: "第 5 晚住宿（連住）",
          detail: "",
          tips: "",
          address: "青森県青森市柳川1-1-5",
          phone: "017-762-0151",
          mapQuery: "ReLabo Medical Spa&Stay 青森"
        }
      ]
    },

    // ---------- 第 6 天 ----------
    {
      day: 6,
      date: "12/25（五）",
      title: "伴手禮・回台灣",
      area: "青森市 → 青森機場",
      places: [
        {
          name: "ReLabo 退房",
          type: "hotel",
          time: "早上",
          summary: "退房",
          detail: "",
          tips: "",
          address: "青森県青森市柳川1-1-5",
          phone: "017-762-0151",
          mapQuery: "ReLabo Medical Spa&Stay 青森"
        },
        {
          name: "A-FACTORY",
          type: "spot",
          time: "10:00～12:00",
          summary: "蘋果西打工廠與伴手禮市集，最後採買",
          detail: "可以參觀蘋果西打的釀造過程，也能買到很多青森特產。10 點開門。",
          tips: "預計 12:00 離開。",
          address: "青森県青森市柳川1-4-2",
          mapQuery: "A-FACTORY 青森"
        },
        {
          name: "青森站 → 青森機場",
          type: "transport",
          time: "12:26 → 13:08",
          summary: "搭機場巴士，13:30 前要到機場",
          detail: "機場巴士班次：11:21 出發 → 12:03 抵達；12:26 出發 → 13:08 抵達。預計 12:00 離開 A-FACTORY，所以搭 12:26 這班。",
          tips: "飛機 15:30 起飛，必須提早 2 小時（13:30）到機場。想更保險的話，可以提早離開 A-FACTORY 改搭 11:21。",
          mapQuery: "青森空港"
        },
        {
          name: "搭機回台灣",
          type: "transport",
          time: "15:30 起飛",
          summary: "回家囉！",
          detail: "",
          tips: "",
          mapQuery: "青森空港"
        }
      ]
    }
  ]
};

// =============================================
// 緊急聯絡資訊（給台灣旅客）
// 2026/10/06 上網查詢；出發前請點來源網址再確認一次。
// =============================================
const emergencyContacts = [
  {
    name: "報警",
    phone: "110",
    note: "警察局。可以說英文。",
    source: "https://www.japan.travel/en/plan/hotline/"
  },
  {
    name: "救護車／消防",
    phone: "119",
    note: "急病、受傷或火災。",
    source: "https://www.japan.travel/en/plan/hotline/"
  },
  {
    name: "台北駐日經濟文化代表處（東京）急難救助",
    phone: "080-1009-7179",
    note: "青森縣屬於東京本處轄區。這支號碼只限車禍、搶劫、生命安危等緊急狀況使用。備用號碼：080-1009-7436",
    source: "https://www.roc-taiwan.org/jp/index.html"
  },
  {
    name: "Japan Visitor Hotline（外國旅客諮詢熱線）",
    phone: "050-3816-2787",
    note: "日本觀光局（JNTO）提供，24 小時全年無休，有中文服務。",
    source: "https://www.japan.travel/en/plan/hotline/"
  }
];

// 自己填寫的欄位：之後把電話填進引號裡面即可
const personalContacts = [
  { name: "旅遊保險", phone: "", note: "" },
  { name: "信用卡掛失", phone: "", note: "" },
  { name: "住宿電話", phone: "", note: "" }
];
