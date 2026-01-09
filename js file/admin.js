document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");
    const logoutBtn = document.getElementById("logoutBtn");

    // PROFILE MENU TOGGLE
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle("show");
        });
        document.addEventListener("click", () => profileMenu.classList.remove("show"));
    }

    // LOGOUT
    logoutBtn?.addEventListener("click", async () => {
        await window.supabaseClient.auth.signOut();
        window.location.href = "index.html";
    });

    // DASHBOARD BUTTONS
    document.querySelector(".card-btn.blue")?.addEventListener("click", () => {
        window.location.href = "total-complaints.html";
    });
    document.querySelector(".card-btn.yellow")?.addEventListener("click", () => {
        window.location.href = "new-complaints.html";
    });
    document.querySelector(".card-btn.red")?.addEventListener("click", () => {
        window.location.href = "pending-complaints.html";
    });
    document.querySelector(".card-btn.green")?.addEventListener("click", () => {
        window.location.href = "resolved-complaints.html";
    });
});







// async function loadAdminDashboard() {
//   // Complaints counts
//   const { data: complaints } = await window.supabaseClient
//     .from("complaints")
//     .select("*");

//   const pendingCount = complaints.filter(c => c.status === "pending").length;
//   const resolvedCount = complaints.filter(c => c.status === "resolved").length;

//   document.querySelector(".card-btn.yellow").innerText = `New Complaints: ${pendingCount}`;
//   document.querySelector(".card-btn.red").innerText = `Pending Complaints: ${pendingCount}`;
//   document.querySelector(".card-btn.green").innerText = `Resolved Complaints: ${resolvedCount}`;
//   document.querySelector(".card-btn.blue").innerText = `Total Complaints: ${complaints.length}`;

//   // Pie chart
//   const ctx = document.getElementById("complaintChart");
//   new Chart(ctx, {
//     type: "pie",
//     data: {
//       labels: ["Pending", "Resolved"],
//       datasets: [{
//         data: [pendingCount, resolvedCount],
//         backgroundColor: ["#facc15", "#4ade80"]
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: { legend: { position: "bottom" } }
//     }
//   });
// }

// // Call on page load
// loadAdminDashboard();









// document.addEventListener("DOMContentLoaded", async () => {
//     // --------- SESSION & ADMIN INFO ----------
//     const { data: { user } } = await window.supabaseClient.auth.getUser();
//     if (!user) {
//         window.location.href = "admin-register.html";
//         return;
//     }

//     // Update profile menu dynamically
//     const profileBtn = document.getElementById("profileBtn");
//     const profileMenu = document.getElementById("profileMenu");
//     if (profileBtn && profileMenu) {
//         profileBtn.querySelector("span").textContent = user.user_metadata?.full_name || "Admin";
//         profileMenu.querySelector("p strong:nth-of-type(1)").nextSibling.textContent = " " + (user.user_metadata?.full_name || "Admin");
//         profileMenu.querySelector("p:nth-of-type(2) strong").nextSibling.textContent = " " + user.email;

//         profileBtn.addEventListener("click", (e) => {
//             e.stopPropagation();
//             profileMenu.classList.toggle("show");
//         });
//         document.addEventListener("click", () => profileMenu.classList.remove("show"));
//     }

//     // --------- DASHBOARD NAV ----------
//     document.getElementById("totalComplaintsBtn")?.addEventListener("click", () => {
//         window.location.href = "total-complaints.html";
//     });
//     document.getElementById("newComplaintsBtn")?.addEventListener("click", () => {
//         window.location.href = "new-complaints.html";
//     });
//     document.getElementById("pendingComplaintsBtn")?.addEventListener("click", () => {
//         window.location.href = "pending-complaints.html";
//     });
//     document.getElementById("resolvedComplaintsBtn")?.addEventListener("click", () => {
//         window.location.href = "resolved-complaints.html";
//     });

//     // Logout
//     document.getElementById("logoutBtn")?.addEventListener("click", async () => {
//         await window.supabaseClient.auth.signOut();
//         window.location.href = "admin-register.html";
//     });

//     // --------- COMPLAINT CHART ----------
//     const { data: allComplaints } = await window.supabaseClient
//         .from("complaints")
//         .select("*");

//     const pendingCount = allComplaints.filter(c => c.status === "pending").length;
//     const resolvedCount = allComplaints.filter(c => c.status === "resolved").length;

//     const ctx = document.getElementById("complaintChart").getContext("2d");
//     new Chart(ctx, {
//         type: "doughnut",
//         data: {
//             labels: ["Pending", "Resolved"],
//             datasets: [{
//                 label: "Complaints",
//                 data: [pendingCount, resolvedCount],
//                 backgroundColor: ["#FF4136", "#2ECC40"]
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: { position: "bottom" }
//             }
//         }
//     });
// });



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
