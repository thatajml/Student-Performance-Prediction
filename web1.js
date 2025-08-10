const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.querySelector(".progress");
let currentStep = 0;

function updateProgressBar() {
    progress.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;
}

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
        updateProgressBar();
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        steps[currentStep].classList.remove("active");
        currentStep--;
        steps[currentStep].classList.add("active");
        updateProgressBar();
    });
});

document.getElementById("multiStepForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const hours = parseFloat(data.hours);
    const attendance = parseFloat(data.attendance);
    const prevScore = parseFloat(data.prevScore);
    const assignments = parseFloat(data.assignments) * 10;
    const participationMap = { "Never": 0, "Sometimes": 40, "Often": 70, "Always": 100 };
    const participation = participationMap[data.participation];
    const materials = data.materials === "Yes" ? 100 : 40;
    const supportMap = { "Low": 40, "Medium": 70, "High": 100 };
    const support = supportMap[data.support];

    const avgScore = (hours*10 + attendance + prevScore + assignments + participation + materials + support) / 7;

    let message = "";
    let cssClass = "";
    if (avgScore >= 75) {
        message = `🌟 Excellent, ${data.name}! High performance expected. Keep it up!`;
        cssClass = "good";
    } else if (avgScore >= 50) {
        message = `📊 Good work, ${data.name}! Moderate performance expected. You can still improve.`;
        cssClass = "moderate";
    } else {
        message = `📉 Needs attention, ${data.name}. Low performance expected.`;
        cssClass = "low";
    }

    const resultBox = document.getElementById("result");
    resultBox.className = `result ${cssClass}`;
    resultBox.textContent = message;
    resultBox.style.display = "block";

    const ctx = document.getElementById("performanceChart").getContext("2d");
    if (window.studentChart) window.studentChart.destroy();

    window.studentChart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Study Hours", "Attendance", "Prev Score", "Assignments", "Participation", "Materials", "Support"],
            datasets: [
                {
                    label: `${data.name}'s Performance`,
                    data: [hours*10, attendance, prevScore, assignments, participation, materials, support],
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2
                },
                {
                    label: "Ideal Performance",
                    data: [60, 90, 85, 100, 100, 100, 100],
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1200,
                easing: 'easeOutBounce'
            },
            scales: {
                r: { suggestedMin: 0, suggestedMax: 100 }
            }
        }
    });

    updateProgressBar();
});
