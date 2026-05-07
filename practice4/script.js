let showVegOnly = false;

function filterMenu() {
  const items = document.getElementsByClassName("veg");
  const allItems = document.querySelectorAll("li");

  if (!showVegOnly) {
    // Ẩn các món không phải vegetarian
    allItems.forEach(item => {
      if (!item.classList.contains("veg")) {
        item.style.display = "none";
      }
    });
    showVegOnly = true;
  } else {
    // Hiện lại tất cả món
    allItems.forEach(item => {
      item.style.display = "list-item";
    });
    showVegOnly = false;
  }
}
