// app.js

// app.js

// دیتای تستی — همین ساختار رو بعد با داده‌های واقعی پر می‌کنیم
const data = {
  "قیمت جدید": [
    { "ردیف": 1, "شرح آیتم": "اضافه بهای صعوبت عملیات", "توضیحات": "ارسال شد" },
    { "ردیف": 2, "شرح آیتم": "پوشش ساندویچ پانل", "توضیحات": "در حال تهیه" }
  ],
  "صورت وضعیت": [
    { "ردیف": 1, "شرح آیتم": "صورت وضعیت 14", "توضیحات": "در حال رسیدگی" }
  ],
  "صورتجلسات": [
    { "ردیف": 1, "شرح آیتم": "سیستم ارتینگ", "توضیحات": "در دست اقدام" }
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

renderTabs();

