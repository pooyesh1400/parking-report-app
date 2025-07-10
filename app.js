function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}
document.getElementById("add-tab-btn").addEventListener("click", function() {
  const tabName = prompt("نام تب جدید را وارد کنید:");
  if (tabName) {
    const tabId = tabName.replace(/\s+/g, '-').toLowerCase(); // نام یکتا

    // اضافه کردن دکمه تب
    const newTabBtn = document.createElement("button");
    newTabBtn.className = "tab-btn";
    newTabBtn.dataset.tab = tabId;
    newTabBtn.textContent = tabName;
    document.querySelector(".tabs").insertBefore(newTabBtn, this); // قبل از دکمه افزودن

    // اضافه کردن محتوای تب
    const newTabContent = document.createElement("div");
    newTabContent.id = tabId;
    newTabContent.className = "tab-content";
    newTabContent.innerHTML = `<h3>${tabName}</h3><p>محتوای اولیه ${tabName}</p>`;
    document.getElementById("tab-contents").appendChild(newTabContent);

    // رویداد فعال‌سازی تب
    newTabBtn.addEventListener("click", function() {
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  }
});
