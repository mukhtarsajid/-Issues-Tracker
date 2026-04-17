 let allIssues = [];

function updateCount(issues) {
  document.getElementById("issueCount").innerText = issues.length;
}

function showAll() {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;
      displayIssues(allIssues);
    });
}

function displayIssues(issues) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  updateCount(issues);

  issues.forEach(issue => {
    const div = document.createElement("div");
     div.className = `card ${issue.status}`;
    div.classList.add("issues-card");

    div.innerHTML = `
      <div class="card">
        <div class="card-header">
          <span class="status-dot"></span>
          <span class="priority high">${issue.priority}</span>
        </div>

        <h3 class="title">${issue.title}</h3>

        <p class="description">${issue.description}</p>

        <div class="labels">
          ${issue.labels.map(l => `<span class="label">${l}</span>`).join("")}
        </div>

        <div class="card-footer">
          <span>#${issue.id} by ${issue.author}</span>
          <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

function showOpen() {
  const openIssues = allIssues.filter(issue => issue.status === "open");
  displayIssues(openIssues);
}

function showClose() {
  const closeIssues = allIssues.filter(issue => issue.status === "closed");
  displayIssues(closeIssues);
}

document.getElementById("All").addEventListener("click", showAll);
document.getElementById("Open").addEventListener("click", showOpen);
document.getElementById("closed").addEventListener("click", showClose);

// page load এ all show করতে
showAll();