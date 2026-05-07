function togglePrice() {
  const prices = document.getElementsByClassName("price");
  for (let i = 0; i < prices.length; i++) {
    if (prices[i].style.display === "none") {
      prices[i].style.display = "block";
    } else {
      prices[i].style.display = "none";
    }
  }
}
