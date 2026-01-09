console.log("Supabase in auth.js:", supabaseClient);
console.log("Supabase auth:", supabaseClient?.auth);

/*index se register */
const btn1 = document.getElementById("btn1");
if (btn1) {
    btn1.addEventListener("click", () => {
        window.location.href = "student-register.html";
    });
}


const btn2 = document.getElementById("btn2");
if (btn2) {
    btn2.addEventListener("click", () => {
        window.location.href = "admin-register.html";
    });
}

const btn3 = document.getElementById("btn3");
if (btn3) {
    btn3.addEventListener("click", () => {
        window.location.href = "signup.html";
    });
}

//student dashboard pe profile

document.getElementById("profileBtn").addEventListener("click", () => {
    const menu = document.getElementById("profileMenu");

    menu.style.display = (menu.style.display === "block")
        ? "none"
        : "block";
});


document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("profileBtn");
    const menu = document.getElementById("profileMenu");

    // CLICK ON PROFILE → SHOW/HIDE
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        menu.classList.toggle("show");
    });

    // CLICK ANYWHERE ELSE → HIDE MENU
    document.addEventListener("click", () => {
        menu.classList.remove("show");
    });

});






document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        profileMenu.classList.remove("show");
    });
});


//login options
const studentLogin = document.getElementById("student-login");

if (studentLogin) {
  studentLogin.addEventListener("click", async () => {

    console.log("Login button clicked ✅");

    const email = document.getElementById("student-username").value.trim();
    const password = document.getElementById("student-password").value.trim();

    console.log("Inputs:", { email, password });

    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    console.log("Calling Supabase Auth...");

    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    console.log("Auth response:", data, error);

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;
    console.log("Logged in user:", user);

    // TEMP: direct role assign
    const { error: updateError } = await window.supabaseClient
      .from("profiles")
      .update({
        role: "student"
      })
      .eq("id", user.id);

    if (updateError) {
      console.log(updateError);
      alert("Profile update failed");
      return;
    }

    console.log("Redirecting 🚀");
    window.location.href = "student-dashboard.html";
  });
}

const adminLogin = document.getElementById("admin-login");

if(adminLogin){
    adminLogin.addEventListener("click", async()=>{
        const email = document.getElementById("admin-username").value.trim();
        const password = document.getElementById("admin-password").value.trim();

        if(!email || !password){
            alert("Please enter email and password");
            return;
        }

        const {data, error} = await window.supabaseClient.auth.signInWithPassword({
            email, password
        });

        if (error){
            alert(error.message);
            return;
        }

        const user = data.user;

        // Role check
        const{data: profile} = await window.supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

        if(!profile || profile.role !== "admin"){
            alert("Not authorized as admin");
            await supabaseClient.auth.signOut();
            return;
        }

        window.location.href = "admin-dashboard.html";
    });
}

// ------------------------------------------

// -------------------------------


const back = document.getElementById("back");
if (back) {
    back.addEventListener("click", async() => {
        await window.supabaseClient.auth.signOut();
        window.location.href = "index.html";
    });
}

const raiseComplaint = document.getElementById("raise-complaint"); 

if (raiseComplaint) {
    raiseComplaint.addEventListener("click", () => {
        window.location.href = "raise-complaints.html";
    });
}

const viewComplaint = document.getElementById("view-complaint"); 

if (viewComplaint) {
    viewComplaint.addEventListener("click", () => {
        window.location.href = "view-complaints.html";
    });
}
