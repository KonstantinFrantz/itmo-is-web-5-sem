document.addEventListener('DOMContentLoaded', () => {
  const chatWidget = document.getElementById('chatWidget');
  const minimizeButton = document.querySelector('.minimize-button');
  const minimizedChat = document.getElementById('minimizedChat');

  const sendButton = document.getElementById('sendButton');
  const userInput = document.getElementById('userInput');
  const chatMessages = document.getElementById('chatMessages');

  function openChatWidget() {
    chatWidget.classList.add('show');
  }

  function minimizeChat() {
    chatWidget.classList.add('minimized');
    minimizedChat.classList.add('show');
  }

  function restoreChat() {
    chatWidget.classList.remove('minimized');
    minimizedChat.classList.remove('show');
  }

  function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    if (sender === 'saul') {
      messageDiv.innerHTML = `<img src="images/saul_gif.gif" alt="Saul Goodman" class="saul-gif"><p>${content}</p>`;
    } else {
      messageDiv.innerHTML = `<p>${content}</p>`;
    }
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
      addMessage(message, 'user');
      userInput.value = '';

      setTimeout(() => {
        const responses = [
          "Good to know! Tell me more about this case.",
          "Know what, this case is so unbelivable that i will give you a 1% sale!",
          "Wow, that's the tough one, better call saul right now!",
          "Know that guy ... Walter White? He was my client!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'saul');
      }, 1000);
    }
  }

  setTimeout(openChatWidget, 5000);

  minimizeButton.addEventListener('click', minimizeChat);

  minimizedChat.addEventListener('click', restoreChat);

  sendButton.addEventListener('click', sendMessage);

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
      e.preventDefault();
    }
  });
});
