document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");

    let isWaitingForReply = false;

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function autoResizeTextarea() {
        userInput.style.height = "auto";
        userInput.style.height = userInput.scrollHeight + "px";
    }

    function addMessage(text, sender = "bot", isTypingIndicator = false) {
        const msg = document.createElement("div");
        msg.classList.add("chat-message", sender);

        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        if (isTypingIndicator) {
            bubble.classList.add("typing-indicator");
            bubble.innerHTML = `
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            `;
        } else {
            bubble.textContent = text;
        }

        const timestamp = document.createElement("div");
        timestamp.classList.add("timestamp");
        const now = new Date();
        timestamp.textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        msg.appendChild(bubble);
        msg.appendChild(timestamp);
        chatWindow.appendChild(msg);
        scrollToBottom();

        return msg;
    }

    async function sendMessage(message) {
        if (!message || isWaitingForReply) return;
        isWaitingForReply = true;

        // Show user message
        addMessage(message, "user");

        // Typing indicator
        const typingMsg = addMessage("", "bot", true);

        // Disable input & send button while waiting
        userInput.disabled = true;
        const sendBtn = chatForm.querySelector("button[type='submit']");
        if (sendBtn) sendBtn.disabled = true;

        try {
            // 🔹 Call your existing Flask endpoint: /get?msg=...
            const response = await fetch(`/get?msg=${encodeURIComponent(message)}`, {
                method: "GET",
            });

            const data = await response.json();

            // Remove typing indicator
            chatWindow.removeChild(typingMsg);

            // Read "response" key from backend
            const reply =
                data.response ||
                "I couldn't generate a response. Please rephrase your question or consult a medical professional.";

            addMessage(reply, "bot");
        } catch (error) {
            console.error("Error while calling /get:", error);
            try {
                chatWindow.removeChild(typingMsg);
            } catch (e) {
                /* ignore */
            }
            addMessage(
                "Something went wrong while contacting the medical assistant. Please try again. For emergencies, contact a doctor or local emergency services.",
                "bot"
            );
        } finally {
            isWaitingForReply = false;
            userInput.disabled = false;
            if (sendBtn) sendBtn.disabled = false;
            userInput.focus();
        }
    }

    // Form submit handler
    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;
        userInput.value = "";
        autoResizeTextarea();
        sendMessage(text);
    });

    // Enter to send, Shift+Enter for new line
    userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            const text = userInput.value.trim();
            if (!text) return;
            userInput.value = "";
            autoResizeTextarea();
            sendMessage(text);
        }
    });

    // Auto-resize textarea
    userInput.addEventListener("input", autoResizeTextarea);
    autoResizeTextarea();

    // Focus input on load
    userInput.focus();
});
