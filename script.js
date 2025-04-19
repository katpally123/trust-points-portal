let trustScores = {};
let comments = {};

document.getElementById("vouchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const phone = document.getElementById("phone").value.trim();
  const comment = document.getElementById("comment").value.trim();

  trustScores[phone] = (trustScores[phone] || 0) + 1;
  comments[phone] = comments[phone] || [];
  if (comment) comments[phone].push(comment);

  renderTrustBoard();
  this.reset();
});

function renderTrustBoard() {
  const board = document.getElementById("trustBoard");
  board.innerHTML = "";

  for (let phone in trustScores) {
    const wrapper = document.createElement("div");
    wrapper.style.margin = "10px 0";
    wrapper.style.padding = "10px";
    wrapper.style.border = "1px solid #ccc";
    wrapper.style.borderRadius = "5px";
    wrapper.style.background = "#f9f9f9";

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";

    const phoneLabel = document.createElement("span");
    phoneLabel.textContent = phone;
    phoneLabel.style.fontWeight = "bold";

    const scoreLabel = document.createElement("span");
    scoreLabel.textContent = `${trustScores[phone]} pts`;

    row.appendChild(phoneLabel);
    row.appendChild(scoreLabel);
    wrapper.appendChild(row);

    const commentBlock = document.createElement("div");
    commentBlock.style.marginTop = "5px";
    commentBlock.style.color = "gray";
    comments[phone].forEach(c => {
      const p = document.createElement("p");
      p.textContent = `– ${c}`;
      commentBlock.appendChild(p);
    });

    wrapper.appendChild(commentBlock);
    board.appendChild(wrapper);
  }
}
