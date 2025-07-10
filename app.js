let tabs = {};
let activeTab = null;

document.getElementById('addTab').onclick = () => {
  const name = prompt('نام تب جدید:');
  if (name) addTab(name);
};

function addTab(name) {
  tabs[name] = { headers: [], rows: [] };
  renderTabs();
  switchTab(name);
}

function renderTabs() {
  const container = document.getElementById('tabContainer');
  container.innerHTML = '';
  for (let name in tabs) {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.onclick = () => switchTab(name);
    container.appendChild(btn);
  }
}

function switchTab(name) {
  activeTab = name;
  renderTable();
}

function renderTable() {
  const container = document.getElementById('tableContainer');
  container.innerHTML = '';
  const tab = tabs[activeTab];

  if (!tab) return;

  // Table
  const table = document.createElement('table');
  table.className = 'table';

  // Header row
  const headerRow = table.insertRow();
  tab.headers.forEach((h, i) => {
    const cell = headerRow.insertCell();
    const input = document.createElement('input');
    input.value = h;
    input.onchange = () => { tab.headers[i] = input.value; save(); };
    cell.appendChild(input);
    const del = document.createElement('button');
    del.textContent = '❌';
    del.onclick = () => { tab.headers.splice(i, 1); tab.rows.forEach(r => r.splice(i, 1)); renderTable(); };
    cell.appendChild(del);
  });
  const addCol = headerRow.insertCell();
  addCol.innerHTML = `<button onclick="addColumn()">➕ ستون</button>`;

  // Data rows
  tab.rows.forEach((r, ri) => {
    const row = table.insertRow();
    r.forEach((val, ci) => {
      const cell = row.insertCell();
      const input = document.createElement('input');
      input.value = val;
      input.onchange = () => { tab.rows[ri][ci] = input.value; save(); };
      cell.appendChild(input);
    });
    const delRow = row.insertCell();
    delRow.innerHTML = `<button onclick="deleteRow(${ri})">❌</button>`;
  });

  // Add row button
  const addRow = table.insertRow();
  const cell = addRow.insertCell();
  cell.colSpan = tab.headers.length + 1;
  cell.innerHTML = `<button onclick="addRow()">➕ ردیف</button>`;

  container.appendChild(table);
}

function addColumn() {
  const tab = tabs[activeTab];
  tab.headers.push('ستون جدید');
  tab.rows.forEach(r => r.push(''));
  renderTable();
}

function addRow() {
  const tab = tabs[activeTab];
  const newRow = tab.headers.map(() => '');
  tab.rows.push(newRow);
  renderTable();
}

function deleteRow(index) {
  tabs[activeTab].rows.splice(index, 1);
  renderTable();
}

function save() {
  localStorage.setItem('parkingAppData', JSON.stringify(tabs));
}

function exportData() {
  const blob = new Blob([JSON.stringify(tabs, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'report-data.json';
  a.click();
}

function importData(event) {
  const reader = new FileReader();
  reader.onload = e => {
    tabs = JSON.parse(e.target.result);
    renderTabs();
  };
  reader.readAsText(event.target.files[0]);
}

// Load on start
window.onload = () => {
  const saved = localStorage.getItem('parkingAppData');
  if (saved) {
    tabs = JSON.parse(saved);
    renderTabs();
  }
};
