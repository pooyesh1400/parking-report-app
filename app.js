let tabs = [];
let activeTab = null;

document.getElementById("addTab").addEventListener("click", () => {
  const name = prompt("نام تب را وارد کنید:");
  if (name) {
    const tab = { name: name, table: [] };
    tabs.push(tab);
    renderTabs();
    setActiveTab(tab);
  }
});

function renderTabs() {
  const container = document.getElementById("tabContainer");
  container.innerHTML = "";
  tabs.forEach(tab => {
    const div = document.createElement("div");
    div.className = "tab";
    div.textContent = tab.name;
    div.addEventListener("click", () => setActiveTab(tab));
    if (tab === activeTab) div.classList.add("active");
    container.appendChild(div);
  });
}

function setActiveTab(tab) {
  activeTab = tab;
  renderTabs();
  renderTable();
}

function renderTable() {
  const container = document.getElementById("tableContainer");
  container.innerHTML = "";

  if (!activeTab) {
    container.innerHTML = "<p>ابتدا یک تب انتخاب کنید.</p>";
    return;
  }

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  activeTab.table.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");

    row.forEach((cell, colIndex) => {
      const td = document.createElement("td");
      td.style.border = "1px solid #334155";
      td.style.padding = "10px";
      td.contentEditable = true;
      td.innerText = cell;

      td.addEventListener("input", () => {
        activeTab.table[rowIndex][colIndex] = td.innerText;
      });

      tr.appendChild(td);
    });

    // دکمه حذف سطر
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginRight = "8px";
    deleteBtn.onclick = () => {
      activeTab.table.splice(rowIndex, 1);
      renderTable();
    };
    const tdBtn = document.createElement("td");
    tdBtn.appendChild(deleteBtn);
    tr.appendChild(tdBtn);

    table.appendChild(tr);
  });

  container.appendChild(table);

  // دکمه اضافه سطر
  const addRowBtn = document.createElement("button");
  addRowBtn.textContent = "➕ افزودن سطر";
  addRowBtn.onclick = () => {
    const cols = activeTab.table[0]?.length || 3;
    activeTab.table.push(Array(cols).fill(""));
    renderTable();
  };
  container.appendChild(addRowBtn);

  // دکمه اضافه ستون
  const addColBtn = document.createElement("button");
  addColBtn.textContent = "➕ افزودن ستون";
  addColBtn.style.marginRight = "12px";
  addColBtn.onclick = () => {
    activeTab.table.forEach(row => row.push(""));
    if (activeTab.table.length === 0) {
      activeTab.table.push([""]);
    }
    renderTable();
  };
  container.appendChild(addColBtn);
}

function exportData() {
  const data = JSON.stringify(tabs);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "application/json" }));
  a.download = "data.json";
  a.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    tabs = JSON.parse(e.target.result);
    if (tabs.length) {
      activeTab = tabs[0];
    }
    renderTabs();
    renderTable();
  };
  reader.readAsText(file);
}
