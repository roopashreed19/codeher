const questions = [
    {
        question: "What is the primary purpose of the OSI model in computer networks?",
        options: [
            "To define how data is transferred between devices",
            "To provide a framework for data compression",
            "To ensure secure data transmission",
            "To determine the path for data routing"
        ],
        answer: 0 
    },
    {
        question: "In a TCP connection, which of the following is responsible for ensuring reliable delivery of data?",
        options: [
            "IP Protocol",
            "UDP Protocol",
            "TCP Protocol",
            "Ethernet Protocol"
        ],
        answer: 2
    },
    {
        question: "What is the maximum transmission unit (MTU) in an Ethernet network?",
        options: [
            "512 bytes",
            "1024 bytes",
            "1500 bytes",
            "2048 bytes"
        ],
        answer: 2
    },
    {
        question: "Which layer of the OSI model is responsible for error detection and correction?",
        options: [
            "Network Layer",
            "Transport Layer",
            "Data Link Layer",
            "Application Layer"
        ],
        answer: 2
    },
    {
        question: "What does the term 'DNS' stand for in networking?",
        options: [
            "Data Network Service",
            "Domain Name System",
            "Direct Network Service",
            "Domain Network Service"
        ],
        answer: 1
    },
    {
        question: "Which protocol is used for secure communication over the internet?",
        options: [
            "HTTP",
            "FTP",
            "HTTPS",
            "SMTP"
        ],
        answer: 2
    },
    {
        question: "What is the primary difference between TCP and UDP?",
        options: [
            "TCP is faster than UDP",
            "UDP is connection-oriented while TCP is connectionless",
            "TCP provides reliable delivery, whereas UDP does not",
            "UDP ensures error checking, while TCP does not"
        ],
        answer: 2
    },
    {
        question: "Which of the following devices operates at the Data Link Layer of the OSI model?",
        options: [
            "Router",
            "Switch",
            "Hub",
            "Gateway"
        ],
        answer: 1
    },
    {
        question: "Which of the following is NOT a valid IP address class?",
        options: [
            "Class A",
            "Class B",
            "Class D",
            "Class E"
        ],
        answer: 3
    },
    {
        question: "In a client-server architecture, which of the following is the role of the client?",
        options: [
            "To manage resources",
            "To provide services to other systems",
            "To initiate requests to the server",
            "To store data"
        ],
        answer: 2
    },
    {
        question: "What is the role of a router in a network?",
        options: [
            "It connects devices within the same network.",
            "It directs data packets between different networks.",
            "It provides encryption for data transmission.",
            "It filters incoming data packets."
        ],
        answer: 1
    },
    {
        question: "Which protocol is used to assign IP addresses to devices on a local network?",
        options: [
            "DNS",
            "DHCP",
            "HTTP",
            "FTP"
        ],
        answer: 1
    },
    {
        question: "What is the purpose of NAT (Network Address Translation)?",
        options: [
            "To provide security by hiding internal IP addresses",
            "To ensure reliable delivery of data packets",
            "To convert data from analog to digital form",
            "To convert IP addresses into DNS names"
        ],
        answer: 0
    },
    {
        question: "Which of the following is the main advantage of IPv6 over IPv4?",
        options: [
            "Faster data transmission speed",
            "Larger address space",
            "Better security features",
            "Higher network throughput"
        ],
        answer: 1
    }
];

let currentQuestionIndex = 0;

function displayQuestion() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;

    optionsContainer.innerHTML = ''; // Clear previous options

    question.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.onclick = function() { checkAnswer(index); };
        optionsContainer.appendChild(optionButton);
    });
}

// Check if the selected answer is correct
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.answer) {
        alert("Correct Answer!");
    } else {
        alert("Wrong Answer!");
    }

    // Move to next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        alert("You have completed the quiz!");
    }
}

// Start the quiz by displaying the first question
function startQuiz() {
    document.getElementById("nextQuestionBtn").style.display = "none"; // Hide the start button after starting
    currentQuestionIndex = 0;
    displayQuestion();
}
