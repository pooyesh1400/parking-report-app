function addReport() {
  const text = document.getElementById("reportText").value.trim();
  if (text === "") return;

  let reports = JSON.parse(localStorage.getItem("reports") || "[]");
  reports.unshift(text);
  localStorage.setItem("reports", JSON.stringify(reports));

  document.getElementById("reportText").value = "";
  loadReports();
}

function loadReports() {
  const reportList = document.getElementById("reportList");
  reportList.innerHTML = "";

  let reports = JSON.parse(localStorage.getItem("reports") || "[]");

  reports.forEach((report) => {
    const li = document.createElement("li");
    li.textContent = report;
    reportList.appendChild(li);
  });
}

window.onload = loadReports;
