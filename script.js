const phoneInput = document.getElementById("phone");
const commentInput = document.getElementById("comment");
const board = document.getElementById("trustBoard");

// 🔍 Confirm it's working
console.log("Script loaded");

document.getElementById("vouchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const phone = phoneInput.value.trim();
  const comment = commentInput.value.trim();
  if (!phone) return;

  console.log("Form submitted", phone, comment);

  const ref = firebase.database().ref("trust/" + phone);
  ref.once("value").then(snapshot => {
    const data = snapshot.val() || { score: 0, comments: [] };
    data.score += 1;
    if (comment) data.comments.push(comment);
    ref.set(data);
  });

  phoneInput.value = "";
  commentInput.value = "";
});

function renderTrustBoard(snapshot) {
  const data = snapshot.val() || {};
  board.innerHTML = "";

  for (let phone in data) {
    const entry = data[phone];
    const wrapper = document.createElement("div");

    const row = document.createElement("div");
    row.className = "row";

    const phoneLabel = document.createElement("span");
    phoneLabel.textContent = phone;
    phoneLabel.style.fontWeight = "bold";

    const scoreLabel = document.createElement("span");
    scoreLabel.textContent = `${entry.score} pts`;

    row.appendChild(phoneLabel);
    row.appendChild(scoreLabel);
    wrapper.appendChild(row);

    const commentBlock = document.createElement("div");
    commentBlock.className = "comment";
    (entry.comments || []).forEach(c => {
      const p = document.createElement("p");
      p.textContent = `– ${c}`;
      commentBlock.appendChild(p);
    });

    wrapper.appendChild(commentBlock);
    board.appendChild(wrapper);
  }
}

// ✅ Listen for updates from Firebase
firebase.database().ref("trust").on("value", renderTrustBoard);



