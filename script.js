let transactions = [];
let trustScores = {};

document.getElementById("transactionForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const sender = sender.value.trim();
  const receiver = receiver.value.trim();
  const cad = parseFloat(document.getElementById("cad").value);
  const inr = parseFloat(document.getElementById("inr").value);
  const date = document.getElementById("date").value;

  // Add trust points
  trustScores[sender] = (trustScores[sender] || 0) + 10;
  trustScores[receiver] = (trustScores[receiver] || 0) + 10;

  transactions.push({ sender, receiver, cad, inr, date });
  renderTrustScores();
  this.reset();
});

function renderTrustScores() {
  const board = document.getElementById("trustBoard");
  board.innerHTML = "";
  for (let user in trustScores) {
    board.innerHTML += `<p><strong>${user}</strong>: ${trustScores[user]} points</p>`;
  }
}
