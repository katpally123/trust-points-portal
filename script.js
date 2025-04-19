let trustScores = {};
let comments = {};

document.getElementById("vouchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const phone = document.getElementById("phone").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!phone) return;

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

    const row = document.createElement("div");
    row.className = "row";

    const phoneLabel = document.createElement("span");
    phoneLabel.textContent = phone;
    phoneLabel.style.fontWeight = "bold";

    const scoreLabel = document.createElement("span");
    scoreLabel.textContent = `${trustScores[phone]} pts`;

    row.appendChild(phoneLabel);
    row.appendChild(scoreLabel);
    wrapper.appendChild(row);

    const commentBlock = document.createElement("div");
    commentBlock.className = "comment";
    comments[phone].forEach(c => {
      const p = document.createElement("p");
      p.textContent = `– ${c}`;
      commentBlock.appendChild(p);
    });

    wrapper.appendChild(commentBlock);
    board.appendChild(wrapper);
  }
}
