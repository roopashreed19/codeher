document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const studyPlan = document.querySelector(".study-plan");
    const practiceSection = document.createElement("div");
    practiceSection.classList.add("practice-questions");
    document.body.appendChild(practiceSection);

    // Questions array
    const questions = [
        {
            question: "What is the derivative of x²?",
            options: ["x", "2x", "x³", "2"],
            correct: 1
        },
        {
            question: "What is the integral of 2x?",
            options: ["x² + C", "x + C", "2x + C", "x³ + C"],
            correct: 0
        }
    ];

    let currentQuestionIndex = 0;

    // Function to display questions
    function showQuestion(index) {
        if (index >= questions.length) {
            practiceSection.innerHTML = "<h2>🎉 You've completed the quiz!</h2>";
            return;
        }

        const q = questions[index];
        practiceSection.innerHTML = `
            <div class="practice-card">
                <h2>Practice Questions</h2>
                <p>Question ${index + 1} of ${questions.length}</p>
                <h3>${q.question}</h3>
                ${q.options.map((opt, i) => `<button class="option">${opt}</button>`).join("")}
                <button id="next-btn">Next Question</button>
            </div>
        `;

        document.getElementById("next-btn").addEventListener("click", function () {
            showQuestion(++currentQuestionIndex);
        });
    }

    // Event listener for clicking "Practice Questions"
    cards.forEach(card => {
        card.addEventListener("click", function () {
            if (this.textContent.includes("Practice Questions")) {
                studyPlan.style.display = "none";
                practiceSection.style.display = "block";
                showQuestion(0);
            } else {
                practiceSection.style.display = "none";
            }
        });
    });

    // Initially hide practice section
    practiceSection.style.display = "none";
});
