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

const studentLogin = document.getElementById("student-login");

if (studentLogin) {
    studentLogin.addEventListener("click", () => {

        const username = document.getElementById("student-username").value.trim();
        const password = document.getElementById("student-password").value.trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return; 
        }

        window.location.href = "hostel-select.html";
    });
}


const continueBtn = document.getElementById("continue-btn");
if (continueBtn) {
    continueBtn.addEventListener("click", () => {
        window.location.href = "student-dashboard.html";
    });
}


const adminLogin = document.getElementById("admin-login");
if (adminLogin) {
    adminLogin.addEventListener("click", () => {

    const username = document.getElementById("admin-username").value.trim();
        const password = document.getElementById("admin-password").value.trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return; 
        }


        window.location.href = "admin-dashboard.html";
    });
}

const back = document.getElementById("back");
if (back) {
    back.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}

const raiseComplaint = document.getElementById("raise-complaint"); 

if (raiseComplaint) {
    raiseComplaint.addEventListener("click", () => {
        window.location.href = "raise-complaints.html";
    });
}
