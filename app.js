
let tabs = [];
let activeTabIndex = null;

document.getElementById("addTab").onclick = addTab;

function addTab() {
  const name = prompt("نام تب جدید:");
  if (name) {
    tabs.push({ name, table: [["سطر جدید"]] });
    activeTabIndex = tabs.length - 1;
    renderTabs();
    renderTable();
  }
}

function renderTabs() {
  const container = document.getElementById("tabContainer");
  container.innerHTML = "";
  tabs.forEach((tab, index) => {
    const div = document.createElement("div");
    div.className = "tab" + (index === activeTabIndex ? " active" : "");
    div.textContent = tab.name;
    div.onclick = () => { activeTabIndex = index; renderTabs(); renderTable(); };
    container.appendChild(div);
  });
}

function renderTable() {
  const container = document.getElementById("tableContainer");
  container.innerHTML = "";
  if (activeTabIndex === null) return;
  const tableData = tabs[activeTabIndex].table;
  const table = document.createElement("table");

  tableData.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach((cell, colIndex) => {
      const td = document.createElement("td");
      td.contentEditable = true;
      td.innerText = cell;
      td.oninput = () => {
        tableData[rowIndex][colIndex] = td.innerText;
      };
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  const addRowBtn = document.createElement("button");
  addRowBtn.textContent = "➕ سطر جدید";
  addRowBtn.onclick = () => {
    const cols = tableData[0]?.length || 1;
    const newRow = Array(cols).fill("");
    tableData.push(newRow);
    renderTable();
  };

  const addColBtn = document.createElement("button");
  addColBtn.textContent = "➕ ستون جدید";
  addColBtn.onclick = () => {
    tableData.forEach(row => row.push(""));
    renderTable();
  };

  container.appendChild(table);
  container.appendChild(addRowBtn);
  container.appendChild(addColBtn);
}

function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tabs));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = "parking_data.json";
  a.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    tabs = JSON.parse(e.target.result);
    activeTabIndex = 0;
    renderTabs();
    renderTable();
  };
  reader.readAsText(file);
}

function importExcel(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      tabs.push({ name: sheetName, table: jsonData });
    });
    activeTabIndex = tabs.length - 1;
    renderTabs();
    renderTable();
  };
  reader.readAsArrayBuffer(file);
}
