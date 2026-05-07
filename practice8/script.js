document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const interests = document.querySelectorAll("input[name='interest']:checked");
  const result = document.getElementById("result");

  // Kiểm tra email hợp lệ
  const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

  if (fullname === "" || email === "") {
    result.textContent = "Vui lòng điền đầy đủ thông tin!";
    result.style.color = "red";
  } else if (!emailPattern.test(email)) {
    result.textContent = "Email không hợp lệ!";
    result.style.color = "red";
  } else if (interests.length === 0) {
    result.textContent = "Vui lòng chọn ít nhất một sở thích!";
    result.style.color = "red";
  } else {
    result.textContent = "Đăng ký thành công! Cảm ơn bạn.";
    result.style.color = "green";
  }
});
