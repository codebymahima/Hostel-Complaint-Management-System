// Dummy data (later backend se aayega)
const complaints = [
  { status: "pending" },
  { status: "resolved" },
  { status: "pending" },
  { status: "pending" },
  { status: "resolved" }
];

// Count logic
const pendingCount = complaints.filter(c => c.status === "pending").length;
const resolvedCount = complaints.filter(c => c.status === "resolved").length;

// Chart render
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
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});
