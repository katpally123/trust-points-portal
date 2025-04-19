let transactions = [];
let trustScores = {};
let trustSources = {}; // who gave points to whom

document.getElementById("transactionForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const sender = sender.value.trim();
  const receiver = receiver.value.trim();
  const cad = parseFloat(document.getElementById("cad").value);
  const inr = parseFloat(document.getElementById("inr").value);
  const date = document.getElementById("date").value;

  trustScores[sender] = (trustScores[sender] || 0) + 10;
  trustScores[receiver] = (trustScores[receiver] || 0) + 10;

  trustSources[receiver] = trustSources[receiver] || [];
  trustSources[sender] = trustSources[sender] || [];

  trustSources[receiver].push(sender);
  trustSources[sender].push(receiver);

  transactions.push({ sender, receiver, cad, inr, date });
  renderTrustScores();
  this.reset();
});

function renderTrustScores() {
  const board = document.getElementById("trustBoard");
  board.innerHTML = "";

  for (let user in trustScores) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "10px";

    const toggle = document.createElement("div");
    toggle.innerHTML = `<strong>${user}</strong>: ${trustScores[user]} points`;
    toggle.style.cursor = "pointer";
    toggle.style.display = "flex";
    toggle.style.justifyContent = "space-between";

    const dropdown = document.createElement("div");
    dropdown.style.display = "none";
    dropdown.style.paddingLeft = "15px";
    dropdown.style.color = "gray";

    let givers = trustSources[user] || [];
    dropdown.innerHTML = givers.map(g => `+10 from ${g}`).join("<br>");

    toggle.onclick = () => {
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    };

    wrapper.appendChild(toggle);
    wrapper.appendChild(dropdown);
    board.appendChild(wrapper);
  }
}
