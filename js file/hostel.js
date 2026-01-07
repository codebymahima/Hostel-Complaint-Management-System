const continueBtn = document.getElementById("continue-btn");

if (continueBtn) {
    continueBtn.addEventListener("click", () => {

        const hostel = document.getElementById("hostel").value;

        if (hostel === "") {
            alert("Please select a hostel first.");
            return;   
        }

        window.location.href = "student-dashboard.html";
    });
}


const back = document.getElementById("back");
if (back) {
    back.addEventListener("click", () => {
        window.location.href = "student-register.html";
    });
}
