function switchTab(tabId) {
  // Ẩn tất cả nội dung
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => {
    content.classList.remove("active");
  });

  // Bỏ trạng thái active của tất cả tab
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.classList.remove("active");
    // Xóa mũi tên nếu có
    tab.textContent = tab.textContent.replace(" →", "");
  });

  // Hiện nội dung tab được chọn
  document.getElementById(tabId).classList.add("active");

  // Đánh dấu tab được chọn là active và thêm mũi tên
  const activeTab = Array.from(tabs).find(tab => tab.getAttribute("onclick").includes(tabId));
  activeTab.classList.add("active");
  activeTab.textContent += " →";
}
