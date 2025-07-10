let tabs = [];
let activeTabIndex = -1;

document.getElementById("addTab").addEventListener("click", () => {
  const name = prompt("نام تب را وارد کنید:");
  if (name) {
    tabs.push({ name, table: [] });
    activeTabIndex = tabs.length - 1;
    renderTabs();
    renderTable();
  }
});

function renderTabs() {
  const container = document.getElementById("tabContainer");
  container.innerHTML = "";
  tabs.forEach((tab, index) => {
    const btn = document.createElement("div");
    btn.className = "tab" + (index === activeTabIndex ? " active" : "");
    btn.innerText = tab.name;
    btn.onclick = () => {
      activeTabIndex = index;
      renderTabs();
      renderTable();
    };
    container.appendChild(btn);
  });
}

function renderTable() {
  const container = document.getElementById("tableContainer");
  container.innerHTML = "";

  if (activeTabIndex === -1) return;

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.direction = "rtl";

  const currentTable = tabs[activeTabIndex].table;

  currentTable.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach((cell, colIndex) => {
      const td = document.createElement("td");
      td.contentEditable = true;
      td.innerText = cell;
      td.style.border = "1px solid #555";
      td.style.padding = "8px";
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  container.appendChild(table);
}

// ذخیره فایل JSON
function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tabs));
  const a = document.createElement("a");
  a.setAttribute("href", dataStr);
  a.setAttribute("download", "data.json");
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// بارگذاری فایل JSON
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = JSON.parse(e.target.result);
    if (Array.isArray(content)) {
      tabs = content;
    } else if (content.name && content.table) {
      tabs.push(content);
      activeTabIndex = tabs.length - 1;
    }
    renderTabs();
    renderTable();
  };
  reader.readAsText(file);
}
