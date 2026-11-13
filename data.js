// =============================================
// 青森六天五夜：行程資料
// 想修改行程，只要改這個檔案就好，不用動其他程式。
// =============================================
//
// 每個地點(place)可用的欄位：
//   name      名稱（必填）
//   type      類型："transport" 交通、"spot" 景點、"food" 餐廳/咖啡、"hotel" 住宿
//   modes     交通方式（只有交通卡片需要），例如 ["電車", "巴士"]
//             可以用："飛機"、"新幹線"、"電車"、"巴士"、"接駁車"、"步行"
//             新版網站（new.html）會顯示成彩色小標籤；舊版網站不會讀這個欄位
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
          modes: ["飛機"],
          time: "14:20",
          summary: "長榮 BR122 抵達青森機場（日本時間）",
          detail: "出關後前往機場巴士站，搭乘往青森市區的接駁巴士。",
          tips: "12 月的青森可能已經下雪，下飛機前先把外套準備好。",
          mapQuery: "青森空港"
        },
        {
          name: "機場接駁巴士 → 青森市區",
          type: "transport",
          modes: ["巴士"],
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
          modes: ["接駁車"],
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
          modes: ["接駁車"],
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
          modes: ["電車", "巴士"],
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
      title: "八戶一日遊・聖誕市集煙火",
      area: "青森市 → 八戶 → 青森市",
      places: [
        {
          name: "青森站 → 八戶站",
          type: "transport",
          modes: ["新幹線", "電車"],
          time: "A 07:24 或 B 07:52 出發",
          summary: "兩個班次二選一，不吃早餐直接去八戶",
          detail: "A：07:24 → 08:10，46 分鐘，3,800 日圓，在新青森站轉隼號新幹線（轉乘 1 次）。　B：07:52 → 09:26，1 小時 34 分鐘，2,700 日圓，普通列車直達，不用轉車。",
          tips: "八食中心和巴士都是 9:00 開始。選 A 會比較早到，要在八戶站等一下；選 B 比較便宜。（2026/11/12 用 NAVITIME 查詢）",
          mapQuery: "青森駅"
        },
        {
          name: "八戶站 → 八食中心",
          type: "transport",
          modes: ["巴士"],
          time: "班次待確認",
          summary: "南部巴士「八食 150 日圓巴士」，約 10～12 分鐘",
          detail: "在 JR 八戶站東口的「4 號巴士乘車處」搭南部巴士往八食中心方向，車程大約 10～12 分鐘，車資 150 日圓。",
          tips: "可以付現金或用 Suica、PASMO 等交通 IC 卡。用 IC 卡的話照車內指示刷卡。",
          mapQuery: "八戸駅"
        },
        {
          name: "八食中心",
          type: "food",
          time: "早午餐（9:00 開門）",
          summary: "大型海鮮市場，不吃早餐直接來吃海鮮",
          detail: "市場內有很多海鮮攤位和食堂。市場棟營業時間 9:00～18:00。",
          tips: "週三休息（12/24 是週四，有營業）。",
          mapQuery: "八食センター"
        },
        {
          name: "八食中心 → 八戶站",
          type: "transport",
          modes: ["巴士"],
          time: "吃完後",
          summary: "搭巴士回八戶站",
          detail: "從八食中心搭南部巴士回八戶站。",
          tips: "",
          mapQuery: "八食センター"
        },
        {
          name: "（備用）八戶站 → 鮫站",
          type: "transport",
          modes: ["電車", "步行"],
          time: "時間待確認",
          summary: "要去蕪嶋神社才搭：JR 八戶線到鮫站，步行約 15 分鐘",
          detail: "從八戶站搭 JR 八戶線往鮫方向，在鮫站下車，再步行約 15 分鐘到蕪嶋神社。",
          tips: "JR 八戶線班次比較少，出發前先查好時間。",
          mapQuery: "鮫駅"
        },
        {
          name: "（備用）蕪嶋神社",
          type: "spot",
          time: "時間夠再去",
          summary: "海邊小島上的神社，不一定會去",
          detail: "位於海邊的蕪島上，可以眺望海景。",
          tips: "10～3 月參拜時間 8:45～16:50。",
          address: "青森県八戸市鮫町鮫56-2",
          mapQuery: "蕪嶋神社"
        },
        {
          name: "（備用）鮫站 → 八戶站",
          type: "transport",
          modes: ["電車"],
          time: "時間待確認",
          summary: "JR 八戶線回八戶站",
          detail: "從鮫站搭 JR 八戶線回八戶站，再接回青森的電車。",
          tips: "",
          mapQuery: "鮫駅"
        },
        {
          name: "八戶站 → 青森站",
          type: "transport",
          modes: ["新幹線", "電車"],
          time: "C 12:02／D 12:12／E 13:23／F 14:35 出發",
          summary: "四個班次選一班，傍晚前回到青森",
          detail: "C：12:02 → 12:53，51 分鐘，3,800 日圓，搭隼號新幹線到新青森站再轉電車。　D：12:12 → 13:36，2,700 日圓，普通列車直達。　E：13:23 → 14:56，2,700 日圓，普通列車直達。　F：14:35 → 16:10，2,700 日圓，普通列車直達。",
          tips: "盡量在傍晚前回到青森市區，才來得及逛聖誕市集、看 19:00 的煙火。有去蕪嶋神社的話，E 或 F 比較來得及。（2026/11/12 用 NAVITIME 查詢）",
          mapQuery: "八戸駅"
        },
        {
          name: "聖誕市集（クリスマスマーケット in アスパム）",
          type: "food",
          time: "傍晚～晚上",
          summary: "逛聖誕市集，晚餐在市集吃",
          detail: "在青森縣觀光物產館 ASPAM 的西側會場、館內和青い海公園舉辦，有約 10 公尺高的聖誕樹。12/24 開放時間 11:00～20:30，免費入場，飲食另外付費。",
          tips: "2026/11/12 查詢，出發前再到官網確認：https://www.aomori-kanko.or.jp/aspam/christmas-market/",
          mapQuery: "青森県観光物産館アスパム"
        },
        {
          name: "冬季煙火（冬の花火）",
          type: "spot",
          time: "約 19:00",
          summary: "聖誕市集的冬季煙火，12/24 有施放",
          detail: "市集期間會在 12/11、12、13、18、19、20、24、25 施放煙火，時間約 19:00。",
          tips: "時間是「約」19:00，可能因天候變動，提早在會場等。",
          mapQuery: "青森県観光物産館アスパム"
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
          modes: ["巴士"],
          time: "12:26 → 13:08",
          summary: "搭機場巴士，13:30 前要到機場",
          detail: "機場巴士班次：11:21 出發 → 12:03 抵達；12:26 出發 → 13:08 抵達。預計 12:00 離開 A-FACTORY，所以搭 12:26 這班。",
          tips: "飛機 15:30 起飛，必須提早 2 小時（13:30）到機場。想更保險的話，可以提早離開 A-FACTORY 改搭 11:21。",
          mapQuery: "青森空港"
        },
        {
          name: "搭機回台灣",
          type: "transport",
          modes: ["飛機"],
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
// 航班資訊（新版網站 new.html 的「航班卡片」會用到，舊版不會讀）
// 2026/11/13 由使用者提供。
//
// 每個航班可用的欄位：
//   label       去程／回程
//   airline     航空公司
//   flightNo    航班編號
//   date        日期
//   from / to   出發地／目的地
//   departTime  起飛時間（出發地當地時間）
//   arriveTime  抵達時間（目的地當地時間）
//
// ⚠️ 日本比台灣快 1 小時，所以兩邊的時間要用「當地時間」看：
//    去程 9:55 是台灣時間，14:20 是日本時間；
//    回程 15:30 是日本時間，19:00 是台灣時間。
// =============================================
const flights = [
  {
    label: "去程",
    airline: "長榮航空",
    flightNo: "BR122",
    date: "12/20（日）",
    from: "桃園機場",
    to: "青森機場",
    departTime: "09:55",
    arriveTime: "14:20"
  },
  {
    label: "回程",
    airline: "長榮航空",
    flightNo: "BR121",
    date: "12/25（五）",
    from: "青森機場",
    to: "桃園機場",
    departTime: "15:30",
    arriveTime: "19:00"
  }
];

// =============================================
// 住宿清單（新版網站 new.html 的「住宿」頁會用到，舊版不會讀）
// 2026/11/14 從上面行程裡的住宿卡片整理過來。
//
// ⚠️ 電話、地址在三個地方都有：
//    1. 上面 tripData 行程裡的住宿卡片
//    2. 這裡的 hotels
//    3. 下面 personalContacts 的住宿電話
//    飯店資料有變的話，三個地方要一起改。
//
// 每間飯店可用的欄位：
//   name       飯店名稱
//   checkIn    入住日期
//   checkOut   退房日期
//   nights     住幾晚
//   day        入住是第幾天（「看這天的行程」按鈕會跳到這天）
//   detail     說明
//   tips       小提醒
//   address    地址
//   phone      電話
//   mapQuery   用來搜尋 Google Maps 的關鍵字
//
// 官方的入住／退房時間還沒查證，所以先不寫。
// =============================================
const hotels = [
  {
    name: "大和 Roynet 飯店 青森",
    checkIn: "12/20（日）",
    checkOut: "12/21（一）",
    nights: 1,
    day: 1,
    detail: "Daiwa Roynet Hotel Aomori（ダイワロイネットホテル青森），從 JR 青森站步行約 5 分鐘。",
    tips: "第 2 天早上退房後，可以把行李寄放在櫃檯，記得拿號碼牌。",
    address: "青森県青森市新町1-11-16",
    phone: "017-732-7380",
    mapQuery: "ダイワロイネットホテル青森"
  },
  {
    name: "星野集團 奧入瀨溪流飯店",
    checkIn: "12/21（一）",
    checkOut: "12/23（三）",
    nights: 2,
    day: 2,
    detail: "Hoshino Resorts Oirase Keiryu Hotel（星野リゾート 奥入瀬渓流ホテル），就在奧入瀨溪流旁邊的溫泉飯店。",
    tips: "連住兩晚。從青森站搭接駁車，一天只有一班（15:00 發車，14:30 前要到）。",
    address: "青森県十和田市奥瀬字栃久保231",
    phone: "0570-073-022",
    mapQuery: "星野リゾート 奥入瀬渓流ホテル"
  },
  {
    name: "ReLabo Medical Spa & Stay",
    checkIn: "12/23（三）",
    checkOut: "12/25（五）",
    nights: 2,
    day: 4,
    detail: "位於青森市區的健康主題飯店。",
    tips: "連住兩晚。第 4 天吃完午餐先來放行李，再出發去弘前。",
    address: "青森県青森市柳川1-1-5",
    phone: "017-762-0151",
    mapQuery: "ReLabo Medical Spa&Stay 青森"
  }
];

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
    name: "台北駐日經濟文化代表處（東京）24 小時專線",
    phone: "03-3280-7917",
    note: "官網列出的 24 小時專線，上面兩支手機號碼打不通時可以改打。（2026/11/12 查詢）",
    source: "https://roc-taiwan.org/jp/post/331.html"
  },
  {
    name: "Japan Visitor Hotline（外國旅客諮詢熱線）",
    phone: "050-3816-2787",
    note: "日本觀光局（JNTO）提供，24 小時全年無休，有中文服務。",
    source: "https://www.japan.travel/en/plan/hotline/"
  }
];

// =============================================
// 行前準備清單
// 想新增項目：在 items 裡加一行 "項目名稱",
// 注意：項目名稱會用來記住打勾狀態，改名後該項會變回沒打勾
// =============================================
const checklist = [
  {
    category: "證件與金錢",
    items: [
      "護照",
      "身分證",
      "簽證",
      "日幣現金",
      "信用卡",
      "台灣旅遊保險（是否已購買）"
    ]
  },
  {
    category: "電子用品",
    items: [
      "手機充電器",
      "行動電源（只可放隨身行李，不可放入託運行李）",
      "eSIM 或電信漫遊"
    ]
  },
  {
    category: "盥洗用品",
    items: [
      "牙膏",
      "牙刷",
      "洗面乳",
      "化妝品（保濕、乳液、面膜、防曬等等）"
    ]
  },
  {
    category: "常備用藥",
    items: [
      "感冒藥",
      "退燒藥",
      "腸胃藥",
      "止痛藥",
      "慢性病用藥",
      "保健食品"
    ]
  },
  {
    category: "保暖用品",
    items: [
      "手套",
      "耳罩",
      "毛帽",
      "發熱衣／褲",
      "暖暖包"
    ]
  }
];

// 自己填寫的欄位：之後把電話填進引號裡面即可
const personalContacts = [
  { name: "旅遊保險", phone: "", note: "" },
  { name: "信用卡掛失", phone: "", note: "" },
  // 住宿電話：三間飯店各一格，電話與上面行程裡的 hotel 卡片相同
  // 之後如果飯店電話有變，記得兩邊（行程卡片和這裡）都要一起改
  { name: "住宿：大和 Roynet 飯店 青森", phone: "017-732-7380", note: "第 1 晚（12/20）" },
  { name: "住宿：星野集團 奧入瀨溪流飯店", phone: "0570-073-022", note: "第 2、3 晚（12/21～12/22）" },
  { name: "住宿：ReLabo Medical Spa & Stay", phone: "017-762-0151", note: "第 4、5 晚（12/23～12/24）" }
];

// =============================================
// 日本旅遊保險（東京海上日動）
// 要入境日本後才能投保，到時候點連結進去申請即可
// =============================================
const japanInsurance = {
  name: "東京海上日動 日本旅遊保險",
  url: "https://tokiomarinenichido.jp/zh-hant/china2/",
  note: "這家保險要入境日本後，用手機連上日本當地網路才能投保。"
};

// =============================================
// 入境紙本表格填寫範例
// 欄位照官方表格（2026/11/12 查詢）：
//   入境卡：https://www.moj.go.jp/isa/immigration/procedures/translation.html
//   海關申報單：https://www.customs.go.jp/kaigairyoko/shinkokusho.htm
// 範例全部是假資料（WANG XIAOMING），不要填入真實姓名和護照號碼
//   label    表格上的欄位名稱
//   example  範例填法
//   note     填寫說明
// =============================================
const entryForms = [
  {
    title: "入境卡（外國人入境記錄）",
    note: "每個人都要各填一張。表格有中文說明，但內容只能用英文或日文填寫。",
    fields: [
      { label: "姓 Family Name", example: "WANG", note: "照護照上的英文拼音，全部大寫" },
      { label: "名 Given Names", example: "XIAOMING", note: "照護照上的英文拼音" },
      { label: "出生日期 Date of Birth", example: "01 05 1990", note: "順序是「日 → 月 → 年」，和海關申報單相反" },
      { label: "現住址 Home Address", example: "國家名 TAIWAN／城市名 TAIPEI", note: "填住在台灣哪個城市" },
      { label: "入境目的 Purpose of visit", example: "☑ 觀光 Tourism", note: "在「觀光」打勾" },
      { label: "抵達航班號 Last flight No.", example: "XX123", note: "填自己搭的航班號碼（看機票或電子機票）" },
      { label: "預定停留期間 Intended length of stay", example: "6 DAYS", note: "12/20～12/25，共 6 天" },
      { label: "在日本的聯絡處 Intended address in Japan", example: "Daiwa Roynet Hotel Aomori", note: "填第 1 晚的飯店名稱" },
      { label: "電話號碼 TEL", example: "017-732-7380", note: "第 1 晚飯店的電話" },
      { label: "提問 1：被強制遣返或拒絕入境的經歷", example: "☑ 無 No", note: "" },
      { label: "提問 2：被判決有罪的記錄", example: "☑ 無 No", note: "" },
      { label: "提問 3：持有違禁藥物、槍炮、刀劍、火藥", example: "☑ 無 No", note: "" },
      { label: "簽名 Signature", example: "（親筆簽名）", note: "" }
    ]
  },
  {
    title: "海關申報單（攜帶品・另寄物品申報單）",
    note: "所有入境的人都要交。同一家人一起入境，只要填一張。",
    fields: [
      { label: "航班號 Flight No.", example: "XX123", note: "和入境卡一樣" },
      { label: "出發地 Point of embarkation", example: "TAIPEI", note: "從哪個城市出發" },
      { label: "入境日期 Date of Arrival in Japan", example: "2026 12 20", note: "順序是「年 → 月 → 日」" },
      { label: "姓名 Name", example: "WANG／XIAOMING", note: "左邊填姓，右邊填名" },
      { label: "在日本的住址 Address in Japan", example: "Daiwa Roynet Hotel Aomori", note: "填第 1 晚的飯店" },
      { label: "電話 Tel", example: "017-732-7380", note: "第 1 晚飯店的電話" },
      { label: "國籍 Nationality", example: "TAIWAN", note: "" },
      { label: "職業 Occupation", example: "OFFICE WORKER", note: "用英文填自己的職業" },
      { label: "出生日期 Date of Birth", example: "1990 05 01", note: "順序是「年 → 月 → 日」，和入境卡相反！" },
      { label: "護照號碼 Passport No.", example: "123456789", note: "這是假號碼，照自己護照填" },
      { label: "同行家人人數", example: "（沒有就空白）", note: "家人一起申報才填：20 歲以上／6～19 歲／未滿 6 歲各幾人" },
      { label: "1-① 毒品、槍炮、爆裂物等禁止物品", example: "☑ No", note: "" },
      { label: "1-② 肉製品、蔬菜、水果、動植物等限制物品", example: "☑ No", note: "有帶肉乾、香腸、水果就要勾 Yes，並先到動植物檢疫櫃台檢查" },
      { label: "1-③ 金塊或黃金製品", example: "☑ No", note: "" },
      { label: "1-④ 超過免稅範圍的物品", example: "☑ No", note: "免稅範圍（每人）：酒 3 瓶（每瓶 760ml）、香菸 200 支、其他個人物品海外市價合計 20 萬日圓以內" },
      { label: "1-⑤ 商業貨物或樣品", example: "☑ No", note: "" },
      { label: "1-⑥ 受別人委託帶進日本的物品", example: "☑ No", note: "包括別人給你、但沒說明原因的行李箱或物品" },
      { label: "2. 現金、支票等超過 100 萬日圓，或貴金屬超過 1kg", example: "☑ No", note: "勾 Yes 的話要另外填「支付手段等攜帶輸出入申報書」" },
      { label: "3. 有沒有另外寄送的物品", example: "☑ No", note: "沒有用郵寄或託運另外寄東西到日本就勾 No" },
      { label: "簽名 Signature", example: "（親筆簽名）", note: "" }
    ]
  }
];

// =============================================
// 緊急聯絡頁的「怎麼撥打」說明
// 2026/11/12 查詢，來源寫在每張卡片的 source
//   title  卡片標題
//   steps  說明（一行一點）
// =============================================
const dialGuide = [
  {
    title: "1. 用台灣門號「語音漫遊」（最直接）",
    steps: [
      "台灣門號要先開通「國際漫遊」。就算沒買上網漫遊，只要手機收得到日本電信訊號，通常就能打電話。",
      "在日本直接撥日本的號碼，不用加 +81。例如急難專線直接撥 080-1009-7179。",
      "漫遊打電話是國際漫遊通話費，比較貴，長話短說。"
    ],
    source: "https://roc-taiwan.org/jp/post/331.html"
  },
  {
    title: "2. 用公用電話（不需要手機訊號）",
    steps: [
      "車站、便利商店或路邊常有綠色或灰色的公用電話。可以投 10 円或 100 円硬幣（100 円不找零），或用電話卡。",
      "拿起話筒直接撥號，不用加國碼。例如 080-1009-7179。",
      "打 110（報警）、119（救護車／消防）免費：數位公用電話拿起話筒直接撥；類比公用電話先按紅色緊急按鈕，再撥號。"
    ],
    source: "https://www.city.nagoya.jp/bousai/shoubou/1012724/1013344/1013345.html"
  },
  {
    title: "3. 只有上網卡／eSIM／Wi-Fi 機，不能打電話時",
    steps: [
      "請飯店櫃台、車站站務員或便利商店店員幫忙，借市內電話撥打。",
      "用 LINE 語音聯絡台灣的家人朋友，請他們在台灣撥外交部緊急聯絡中心 0800-085-095（24 小時、免付費），由外交部聯繫駐日代表處。",
      "自己從日本打外交部的話要撥 +886-800-085-095，國際電話費自付。"
    ],
    source: "https://www.boca.gov.tw/cp-87-2121-7a5da-1.html"
  }
];
