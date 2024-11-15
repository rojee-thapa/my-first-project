// Simple rule-based responses
const responses = {
    // Time-based response for "hello"
    "hello": function() {
        const hour = new Date().getHours(); // Get the current hour of the day
        
        if (hour < 12) {
            return getRandomResponse([
                "Good morning! How can I assist you today?",
                "Good morning! What can I do for you today?",
                "Morning! How's everything going today?"
            ]);
        } else if (hour < 18) {
            return getRandomResponse([
                "Good afternoon! How can I help?",
                "Good afternoon! What's up?",
                "Afternoon! Need any help?"
            ]);
        } else {
            return getRandomResponse([
                "Good evening! How can I assist you?",
                "Good evening! What can I do for you tonight?",
                "Evening! How's your day been?"
            ]);
        }
    },
    "how are you": [
        "I'm just a bot, but I'm doing great! How about you?",
        "I'm doing awesome, thanks for asking!",
        "Feeling good, thank you for checking in!"
    ],
    "bye": [
        "Goodbye! Have a wonderful day!",
        "See you later! Take care!",
        "Goodbye! Hope to talk to you again soon!"
    ],
    "weather": [
        "I can't check the weather right now, but it's always sunny in here!",
        "The weather is perfect... in my virtual world!",
        "It's always a good day for coding!"
    ],
    "default": "Sorry, I didn't understand that. Can you ask something else?",
    "what is your name": "I am just a bot i don't have a name yet. Maybe you can name me.",
    "how old are you?": "I don't age, but I was created just recently!",
    "tell me a joke": [
        "Why don't skeletons fight each other? They don't have the guts!",
        "I told my computer I needed a break... Now it won’t stop sending me Kit-Kats.",
        "Why was the math book sad? It had too many problems.",
        "What do you call fake spaghetti? An impasta!"
    ],
    
};

const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Function to append messages to the chat box
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}



// Function to get a random response from an array
function getRandomResponse(responsesArray) {
    const randomIndex = Math.floor(Math.random() * responsesArray.length);
    return responsesArray[randomIndex];  // Return the randomly selected response
}

// Function to generate the chatbot's response
function generateResponse(message) {
    const userMessage = message.toLowerCase(); // Convert input to lowercase

    if (userMessage.match(/hello|hi|hey|morning|afternoon|evening/)){
        return responses["hello"]();
    }
    if (userMessage.match(/bye|see ya|see you|goodbye|take care/)){
        return getRandomResponse(responses["bye"]);
    }

    // Check if the message is in the responses object
    if (responses[userMessage]) {
        // If the response is a function (like for "hello"),call it
        if (typeof responses[userMessage] === "function") {
            return responses[userMessage]();
        }
        // If the response is an array (e.g., jokes or greetings), return a random one
        if (Array.isArray(responses[userMessage])) {
            return getRandomResponse(responses[userMessage]);
        } else {
            // Otherwise, return the regular response (like "hello", "bye", etc.)
            return responses[userMessage];
        }
    } else {
        // Default response if no match found
        return responses["default"];
    }
}

// Function to send message
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Display user message
    appendMessage(message, 'user');
    userInput.value = '';  // Clear input field

    // Generate bot response
    const botResponse = generateResponse(message);

    // Display bot response
    setTimeout(() => {
        appendMessage(botResponse, 'bot');
    }, 1000);  // Simulate typing delay
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Optionally, allow pressing Enter to send the message
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});



