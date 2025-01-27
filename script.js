document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen");
  const chatScreen = document.getElementById("chat-screen");
  const startChatBtn = document.getElementById("start-chat-btn");
  const usernameInput = document.getElementById("username-input");
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const userList = document.getElementById("user-list");

  let username = "";
  let activeUsers = [];

  // Limit input length in real-time
  usernameInput.addEventListener("input", () => {
    const maxLength = 20;

    if (usernameInput.value.length > maxLength) {
      alert("Yoooooo 20 characters MAX broo!.");
      usernameInput.value = usernameInput.value.slice(0, maxLength);
    }
  });

  // Start chat
  startChatBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();

    // Validate username
    if (!username) {
      alert("Please enter a username to join the chat.");
      return;
    }
    if (username.length > 20) {
      alert("Yoooooo 20 characters MAX broo!..");
      return;
    }
    if (activeUsers.includes(username)) {
      alert("This username is already taken.");
      return;
    }

    // Add username and transition to chat
    activeUsers.push(username);
    updateActiveUsers();
    welcomeScreen.classList.add("d-none");
    chatScreen.classList.remove("d-none");
    notifyUser(`${username} has joined the chat.`);
  });

  // Maximum char length
  messageInput.addEventListener("input", () => {
    const maxLength = 100;
  
    if (messageInput.value.length > maxLength) {
      alert(`Messages cannot exceed ${maxLength} characters. This is not a essay bro, its a chat`);
      messageInput.value = messageInput.value.slice(0, maxLength);
    }
  });
  

  // Send message
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
      addMessage(messageText, "me");
      messageInput.value = "";
    }
  }

  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerHTML = `<strong>${sender === "me" ? username : "User"}:</strong> ${text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to latest message
  }

  function notifyUser(text) {
    const systemMessage = document.createElement("div");
    systemMessage.classList.add("message", "system");
    systemMessage.textContent = text;
    chatBox.appendChild(systemMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function updateActiveUsers() {
    userList.innerHTML = ""; // Clear the list
    activeUsers.forEach((user) => {
      const userItem = document.createElement("li");
      userItem.textContent = user;
      userList.appendChild(userItem);
    });
  }
});
