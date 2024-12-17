let mode = "general";

function setMode(selectedMode) {
    mode = selectedMode;
    document.getElementById("messages").innerHTML = `<p>Welcome to the ${mode} interview! Ask me anything.</p>`;
}

async function submitQuestion() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Send question to backend API
    const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
    });

    const data = await response.json();
    if (data.response) {
        messagesDiv.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
    } else {
        messagesDiv.innerHTML += `<p style="color: red;"><strong>Error:</strong> Failed to fetch response.</p>`;
    }

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Clear input
    document.getElementById("user-input").value = "";
}
