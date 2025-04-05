let questions = {}; // To store questions for answer generation

async function generateQuestions() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    questions = data;

    document.getElementById("easy-list").innerHTML = data.easy.map(q => `<li>${q}</li>`).join("");
    document.getElementById("medium-list").innerHTML = data.medium.map(q => `<li>${q}</li>`).join("");
    document.getElementById("hard-list").innerHTML = data.hard.map(q => `<li>${q}</li>`).join("");
}

async function generateAnswers() {
    if (!questions || Object.keys(questions).length === 0) {
        alert("Please generate questions first.");
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/generate_answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions }),
    });

    const data = await response.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    document.getElementById("answers-output").textContent = data.answers;
}
