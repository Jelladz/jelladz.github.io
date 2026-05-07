function calculateAverage() {
  const gradeCells = document.querySelectorAll("#gradesTable td:nth-child(2)");
  let sum = 0;
  gradeCells.forEach(cell => {
    sum += parseFloat(cell.textContent);
  });
  const avg = sum / gradeCells.length;
  document.getElementById("result").textContent = "Điểm trung bình: " + avg.toFixed(2);
}
