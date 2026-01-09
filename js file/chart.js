// /* =========================
//    chart.js – Admin Complaint Status Chart
// ========================= */

// document.addEventListener("DOMContentLoaded", async () => {
//   if (!window.supabaseClient) {
//     console.error("Supabase not loaded");
//     return;
//   }

//   const ctx = document.getElementById("complaintChart").getContext("2d");

//   // Initialize empty chart
//   let complaintChart = new Chart(ctx, {
//     type: "doughnut",
//     data: {
//       labels: ["Pending", "Resolved"],
//       datasets: [{
//         label: "Complaints",
//         data: [0, 0],
//         backgroundColor: ["#f39c12", "#27ae60"],
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "bottom"
//         },
//         title: {
//           display: true,
//           text: "Complaint Status Overview"
//         }
//       }
//     }
//   });

//   // Function to fetch complaint data and update chart
//   async function updateChart() {
//     const { data: complaints, error } = await window.supabaseClient
//       .from("complaints")
//       .select("status");

//     if (error) {
//       console.error("Error fetching complaints:", error);
//       return;
//     }

//     const pendingCount = complaints.filter(c => c.status === "pending").length;
//     const resolvedCount = complaints.filter(c => c.status === "resolved").length;

//     complaintChart.data.datasets[0].data = [pendingCount, resolvedCount];
//     complaintChart.update();
//   }

//   // Initial load
//   await updateChart();

//   // Optional: auto-refresh chart every 15 seconds
//   setInterval(updateChart, 15000);
// });


// admin.js ke andar
document.addEventListener("DOMContentLoaded", async () => {
  // Supabase se complaints fetch
  const { data: complaints, error } = await supabaseClient
    .from("complaints")
    .select("*");

  if (error) return console.error(error);

  // count by status
  const statusCounts = { pending: 0, resolved: 0, new: 0 };
  complaints.forEach(c => {
    if (statusCounts[c.status] !== undefined) statusCounts[c.status]++;
  });

  // Chart render
  const ctx = document.getElementById("complaintChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Resolved", "New"],
      datasets: [{
        label: "Complaints",
        data: [statusCounts.pending, statusCounts.resolved, statusCounts.new],
        backgroundColor: ["#f7f76a", "#28e34c", "#0099ff"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
});
