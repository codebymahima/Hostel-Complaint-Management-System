// -----------------------------
// student.js
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // Sidebar Buttons
  // -----------------------------
  const raiseBtn = document.querySelector(".side .btn:nth-child(2)"); // Raise complaint
  const viewBtn = document.querySelector(".side .btn:nth-child(3)");  // View complaint
  const logoutBtn = document.querySelector(".side .logout");           // Logout

  if (raiseBtn) {
    raiseBtn.addEventListener("click", () => {
      window.location.href = "raise-complaint.html";
    });
  }

  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      window.location.href = "view-complaint.html";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await window.supabaseClient.auth.signOut();
      window.location.href = "index.html";
    });
  }

  // -----------------------------
  // Raise Complaint Form
  // -----------------------------
  const raiseComplaintForm = document.getElementById("raise-complaint-form");
  if (raiseComplaintForm) {
    raiseComplaintForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const category = document.getElementById("category").value;
      const description = document.getElementById("description").value.trim();

      if (!title || !category || !description) {
        return alert("All fields are required");
      }

      const { data: { user } } = await window.supabaseClient.auth.getUser();
      if (!user) return alert("Please login first");

      const { data: profile } = await window.supabaseClient
        .from("profiles")
        .select("hostel")
        .eq("id", user.id)
        .single();

      const hostel = profile?.hostel || "Unknown";

      const { error } = await window.supabaseClient
        .from("complaints")
        .insert([{
          student_id: user.id,
          hostel,
          title,
          category,
          description,
          status: "pending",
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.error(error);
        return alert("Failed to submit complaint");
      }

      // Optional: notify admin
      await window.supabaseClient.from("notifications").insert([{
        student_id: user.id,
        message: `New complaint submitted by ${user.email}: ${title}`,
        read: false,
        created_at: new Date().toISOString()
      }]);

      // Redirect to dashboard after success
      window.location.href = "student-dashboard.html";
    });
  }

  // -----------------------------
  // View Complaints
  // -----------------------------
  const complaintList = document.getElementById("complaintList");
  if (complaintList) {
    (async () => {
      const { data: { user } } = await window.supabaseClient.auth.getUser();
      if (!user) return;

      const { data: complaints, error } = await window.supabaseClient
        .from("complaints")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        complaintList.innerHTML = "<p>Failed to load complaints.</p>";
        return;
      }

      if (!complaints || complaints.length === 0) {
        complaintList.innerHTML = "<p>No complaints submitted yet.</p>";
        return;
      }

      complaints.forEach(c => {
        const card = document.createElement("div");
        card.className = "complaint-card";

        const date = new Date(c.created_at).toLocaleDateString();

        card.innerHTML = `
        <div class="card-header">
          <div>
            <h3>${c.title}</h3>
            <span class="category">${c.category}</span>
            <span class="date">${date}</span>
          </div>
          <span class="status ${c.status}">
            ${c.status === "pending" ? "Pending" : c.status === "resolved" ? "Resolved" : "In Progress"}
          </span>
        </div>
        <p class="description">${c.description}</p>`;

        complaintList.appendChild(card);
      });
    })();
  }

});
