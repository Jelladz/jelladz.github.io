document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn form reload trang

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const result = document.getElementById("result");

  if (name === "" || email === "" || message === "") {
    result.textContent = "Vui lòng điền đầy đủ thông tin!";
    result.style.color = "red";
  } else {
    result.textContent = "Gửi thành công! Cảm ơn bạn đã liên hệ.";
    result.style.color = "green";
  }
});
