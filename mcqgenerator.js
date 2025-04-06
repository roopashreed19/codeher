said:
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  const input = document.getElementById("fileInput");

  button.addEventListener("click", () => {
    const file = input.files[0];
    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Questions from backend:", data);
      
        const displayDiv = document.getElementById("questionDisplay");
        displayDiv.innerHTML = ""; // Clear previous content
      
        const createSection = (level, questions) => {
          const section = document.createElement("div");
          section.innerHTML = `<h2>${level.toUpperCase()} Questions</h2>`;
          const ul = document.createElement("ul");
      
          questions.forEach((q, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${q}`;
            ul.appendChild(li);
          });
      
          section.appendChild(ul);
          displayDiv.appendChild(section);
        };
      
        createSection("easy", data.easy);
        createSection("medium", data.medium);
        createSection("hard", data.hard);
      })
      .catch((err) => {
        console.error("❌ Upload error:", err);
      });
  });
});