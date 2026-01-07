const complaints = [
    {
        title: "Water Supply Issue",
        category: "Plumbing",
        date: "1/1/2026",
        description: "No water supply in room 304 since morning",
        status: "progress"
    },
    {
        title: "WiFi Not Working",
        category: "Internet",
        date: "2/1/2026",
        description: "WiFi connection keeps dropping every few minutes",
        status: "pending"
    },
    {
        title: "Broken Window",
        category: "Maintenance",
        date: "28/12/2025",
        description: "Window glass is broken in common room",
        status: "resolved"
    }

]

const complaintList = document.getElementById("complaintList");

complaints.forEach(c => {
    const card = document.createElement("div");
    card.className = "complaint-card";

    card.innerHTML = `
    <div class="card-header">
    <div>
        <h3>${c.title}</h3>
        <span class="category">${c.category}</span>
        <span class="date">${c.date}</span>
    </div>
    <span class="status ${c.status}">
        ${c.status === "progress" ? "In Progress" : c.status} 
    </span>
</div>
<p class = "description">${c.description}</p>`;
    complaintList.appendChild(card);
});