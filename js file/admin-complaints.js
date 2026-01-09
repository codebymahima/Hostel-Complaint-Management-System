document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await window.supabaseClient.auth.getUser();
  if (!user) {
    window.location.href = "admin-register.html";
    return;
  }

  // -------- Profile Menu ----------
  const profileBtn = document.getElementById("profileBtn");
  const profileMenu = document.getElementById("profileMenu");
  profileBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu?.classList.toggle("show");
  });
  document.addEventListener("click", () => profileMenu?.classList.remove("show"));
  document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    await window.supabaseClient.auth.signOut();
    window.location.href = "admin-register.html";
  });

  // -------- Determine Page Type ----------
  const pageType = document.querySelector(".heading")?.textContent.toLowerCase();

  // -------- Fetch Complaints ----------
  let query = window.supabaseClient.from("complaints").select("*").order("created_at", { ascending: false });
  
  if (pageType.includes("pending")) query = query.eq("status", "pending");
  else if (pageType.includes("resolved")) query = query.eq("status", "resolved");
  else if (pageType.includes("new")) {
    const lastLogin = user.last_sign_in_at || new Date(0).toISOString();
    query = query.gt("created_at", lastLogin);
  }

  const { data: complaints, error } = await query;
  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById("complaintList");
  if (list) {
    list.innerHTML = complaints.length
      ? complaints.map(c => `
          <div class="complaint-card">
            <h3>${c.title}</h3>
            <p>${c.description}</p>
            <small>Status: ${c.status}</small>
          </div>
        `).join("")
      : "<p>No complaints found</p>";
  }

  // -------- Chart ----------
  const statusCounts = { pending: 0, resolved: 0 };
  complaints.forEach(c => { if (c.status === "pending") statusCounts.pending++; else if (c.status === "resolved") statusCounts.resolved++; });

  const ctx = document.getElementById("complaintChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Resolved"],
      datasets: [{
        data: [statusCounts.pending, statusCounts.resolved],
        backgroundColor: ["#f39c12", "#27ae60"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
});
