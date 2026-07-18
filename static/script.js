function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if (message === "") {
        return;
    }

    let chatBox = document.getElementById("chat-box");

    // User message
    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerHTML = message;
    chatBox.appendChild(userDiv);

    // Send to Flask
    fetch("/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "message=" + encodeURIComponent(message)
    })
    .then(response => response.json())
    .then(data => {
        let botDiv = document.createElement("div");
        botDiv.className = "bot-message";
        botDiv.innerHTML = data.reply;
        chatBox.appendChild(botDiv);

        // Auto scroll
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    input.value = "";
    input.focus();

    // Auto scroll after user message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message on Enter key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});