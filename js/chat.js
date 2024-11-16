document.addEventListener('DOMContentLoaded', () => {
  const chatWidget = document.getElementById('chatWidget');
  const minimizeButton = document.querySelector('.minimize-button');
  const minimizedChat = document.getElementById('minimizedChat');

  const sendButton = document.getElementById('sendButton');
  const userInput = document.getElementById('userInput');
  const chatMessages = document.getElementById('chatMessages');

  const characterWrappers = document.querySelectorAll('.character-icon-wrapper');

  let selectedCharacter = 'saul';
  let messages = {
    saul: [],
    walter: []
  };

  function updateCharacterUI() {
    characterWrappers.forEach(wrapper => {
      if (wrapper.dataset.character === selectedCharacter) {
        wrapper.classList.add('selected');
      } else {
        wrapper.classList.remove('selected');
      }
    });

    if (selectedCharacter === 'walter') {
      chatWidget.classList.add('walter-theme');
      minimizedChat.querySelector('.saul-gif').src = 'images/walter_gif.gif';
    } else {
      chatWidget.classList.remove('walter-theme');
      minimizedChat.querySelector('.saul-gif').src = 'images/saul_gif.gif';
    }

    displayMessages();
  }

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
    messages[selectedCharacter].push({
      content: content,
      sender: sender,
      character: selectedCharacter
    });

    saveMessagesToLocalStorage();

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    if (sender === 'user') {
      const p = document.createElement('p');
      p.textContent = content;
      messageDiv.appendChild(p);
    } else {
      const img = document.createElement('img');
      img.src = selectedCharacter === 'saul' ? 'images/saul_gif.gif' : 'images/walter_gif.gif';
      img.alt = selectedCharacter;
      img.classList.add('saul-gif');
      messageDiv.appendChild(img);

      const p = document.createElement('p');
      p.textContent = content;
      messageDiv.appendChild(p);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function saveMessagesToLocalStorage() {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }

  function loadMessagesFromLocalStorage() {
    if (localStorage.getItem('chatMessages')) {
      messages = JSON.parse(localStorage.getItem('chatMessages'));

      if (!messages.saul) messages.saul = [];
      if (!messages.walter) messages.walter = [];

    } else {
      messages = {
        saul: [],
        walter: []
      };
    }
    displayMessages();
  }

  function displayMessages() {
    while (chatMessages.firstChild) {
      chatMessages.removeChild(chatMessages.firstChild);
    }

    if (!messages[selectedCharacter] || messages[selectedCharacter].length === 0) {
      const initialMessages = {
        saul: 'Saul Goodman here, need help?',
        walter: 'Say my name.'
      };
      const initialContent = initialMessages[selectedCharacter];
      addMessage(initialContent, selectedCharacter);
    } else {
      messages[selectedCharacter].forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.sender);

        if (msg.sender === 'user') {
          const p = document.createElement('p');
          p.textContent = msg.content;
          messageDiv.appendChild(p);
        } else {
          const img = document.createElement('img');
          img.src = msg.character === 'saul' ? 'images/saul_gif.gif' : 'images/walter_gif.gif';
          img.alt = msg.character;
          img.classList.add('saul-gif');
          messageDiv.appendChild(img);

          const p = document.createElement('p');
          p.textContent = msg.content;
          messageDiv.appendChild(p);
        }

        chatMessages.appendChild(messageDiv);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
      addMessage(message, 'user');
      userInput.value = '';

      setTimeout(() => {
        if (selectedCharacter === 'walter') {
          if (message.toLowerCase() === 'heisenberg') {
            addMessage("You're goddamn right.", selectedCharacter, selectedCharacter);
          } else {
            addMessage("Say my name.", selectedCharacter);
          }
        } else if (selectedCharacter === 'saul') {
          const responses = [
            "Good to know! Tell me more about this case.",
            "Know what, this case is so unbelievable that I will give you a 1% sale!",
            "Wow, that's the tough one, better call Saul right now!",
            "Know that guy ... Walter White? He was my client!"
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(randomResponse, selectedCharacter);
        }
      }, 1000);
    }
  }

  if (localStorage.getItem('selectedCharacter')) {
    selectedCharacter = localStorage.getItem('selectedCharacter');
  }

  loadMessagesFromLocalStorage();

  updateCharacterUI();

  characterWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      selectedCharacter = wrapper.dataset.character;
      localStorage.setItem('selectedCharacter', selectedCharacter);
      updateCharacterUI();
    });
  });

  minimizeButton.addEventListener('click', minimizeChat);

  minimizedChat.addEventListener('click', restoreChat);

  sendButton.addEventListener('click', sendMessage);

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
      e.preventDefault();
    }
  });

  setTimeout(openChatWidget, 100);
});
