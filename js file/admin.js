async function loadAdminDashboard() {
  // Complaints counts
  const { data: complaints } = await window.supabaseClient
    .from("complaints")
    .select("*");

  const pendingCount = complaints.filter(c => c.status === "pending").length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  document.querySelector(".card-btn.yellow").innerText = `New Complaints: ${pendingCount}`;
  document.querySelector(".card-btn.red").innerText = `Pending Complaints: ${pendingCount}`;
  document.querySelector(".card-btn.green").innerText = `Resolved Complaints: ${resolvedCount}`;
  document.querySelector(".card-btn.blue").innerText = `Total Complaints: ${complaints.length}`;

  // Pie chart
  const ctx = document.getElementById("complaintChart");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Pending", "Resolved"],
      datasets: [{
        data: [pendingCount, resolvedCount],
        backgroundColor: ["#facc15", "#4ade80"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } }
    }
  });
}

// Call on page load
loadAdminDashboard();




// // Dummy data (later backend se aayega)
// const complaints = [
//   { status: "pending" },
//   { status: "resolved" },
//   { status: "pending" },
//   { status: "pending" },
//   { status: "resolved" }
// ];

// // Count logic
// const pendingCount = complaints.filter(c => c.status === "pending").length;
// const resolvedCount = complaints.filter(c => c.status === "resolved").length;

// // Chart render
// const ctx = document.getElementById("complaintChart");

// new Chart(ctx, {
//   type: "pie",
//   data: {
//     labels: ["Pending", "Resolved"],
//     datasets: [{
//       data: [pendingCount, resolvedCount],
//       backgroundColor: ["#facc15", "#4ade80"]
//     }]
//   },
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom"
//       }
//     }
//   }
// });
