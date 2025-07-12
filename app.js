// app.js

// دیتای پروژه (از فایل اکسل یا JSON جایگزین می‌کنی)
const data = {
  "قیمت جدید": [
    { "ردیف": 1, "شرح آیتم": "اضافه بهای صعوبت عملیات", "توضیحات": "ارسال شد" },
    { "ردیف": 2, "شرح آیتم": "پوشش ساندویچ پانل", "توضیحات": "در حال تهیه" }
  ],
  "صورت وضعیت": [
    { "ردیف": 1, "شرح آیتم": "صورت وضعیت 14", "توضیحات": "در حال رسیدگی" },
    { "ردیف": 2, "شرح آیتم": "صورت وضعیت 15", "توضیحات": "ارسال شده" }
  ],
  "صورتجلسات": [
    { "ردیف": 1, "شرح آیتم": "سیستم ارتینگ", "توضیحات": "در دست اقدام" },
    { "ردیف": 2, "شرح آیتم": "دوربین مداربسته", "توضیحات": "آماده نصب" }
  ],
  "درخواست خرید": [
    { "ردیف": 1, "شرح آیتم": "سنگ بلک بیوتی", "تاریخ": "1403/10/18", "توضیحات": "سنگ پیرامونی" },
    { "ردیف": 2, "شرح آیتم": "پنجره PVC", "تاریخ": "1404/01/18", "توضیحات": "برای کانکس" }
  ]
};

// رندر تب‌ها
function renderTabs() {
  const tabContainer = document.getElementById("tabContainer");
  tabContainer.innerHTML = "";
  Object.keys(data).forEach((tabName, index) => {
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.textContent = tabName;
    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderTable(tabName);
    };
    if (index === 0) {
      tab.classList.add("active");
      renderTable(tabName);
    }
    tabContainer.appendChild(tab);
  });
}

// رندر جدول هر تب
function renderTable(tabName) {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = "";

  const tableData = data[tabName];
  if (!tableData || tableData.length === 0) {
    tableContainer.innerHTML = "<p>موردی ثبت نشده است.</p>";
    return;
  }

  const table = document.createElement("table");

  // سرتیتر
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  Object.keys(tableData[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // بدنه جدول
  const tbody = document.createElement("tbody");
  tableData.forEach(row => {
    const tr = document.createElement("tr");
    Object.values(row).forEach(value => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  tableContainer.appendChild(table);
}

// شروع برنامه
renderTabs();
