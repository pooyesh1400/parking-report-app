function showPage(page) {
  let content = document.getElementById("content");

  if (page === 'purchase') {
    content.innerHTML = "<h2>درخواست خرید</h2><p>در این بخش لیست درخواست‌ها نمایش داده می‌شود.</p>";
  }
  else if (page === 'sessions') {
    content.innerHTML = "<h2>صورتجلسات</h2><p>در این بخش صورتجلسات ثبت شده نمایش داده می‌شود.</p>";
  }
  else if (page === 'status') {
    content.innerHTML = "<h2>صورت وضعیت</h2><p>در این بخش صورت وضعیت‌ها نمایش داده می‌شود.</p>";
  }
}
