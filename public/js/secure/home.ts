const socket = io.connect();
const chatMessage: HTMLElement = document.getElementById('message')!;
const chatMessageSpinnerWrapper: HTMLElement = document.getElementById(
  'chat-spinner-wrapper'
)!;
const messagesWrapper: HTMLElement =
  document.getElementById('messages-wrapper')!;
const deleteChatBtn: NodeListOf<Element> =
  document.querySelectorAll('.delete-chat-btn');
const chatSpinnerWrapper = document.getElementById('chat-spinner-wrapper')!;

const d = (current: number, previous: number): string => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) {
      return 'Just now';
    }
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
};

socket.on('broadcast-message', (data) => {
  const li = document.createElement('li');
  li.className = 'message-wrapper';

  const email = document.createElement('span');
  email.className = 'email';
  email.textContent = `${
    data.firstName.charAt(0).toUpperCase() + data.firstName.substring(1)
  } ${data.lastName.charAt(0).toUpperCase() + data.lastName.substring(1)}`;

  const date = document.createElement('span');
  date.className = 'date';
  date.textContent = d(new Date(), new Date(data.createdAt));

  const isAdmin = document.createElement('span');
  const deleteBtn = document.createElement('button');
  deleteBtn.id = data._id
  deleteBtn.textContent = "Delete"
  deleteBtn.classList.add("btn")
  deleteBtn.classList.add("btn-danger")
  deleteBtn.classList.add("delete-chat-btn")

  isAdmin.append(deleteBtn)

  const message = document.createElement('p');
  message.className = 'message';
  message.textContent = data.chat;

  li.append(email);
  li.append(date);
  li.append(isAdmin)
  li.append(message);

  messagesWrapper.appendChild(li);
  scrollToLastChat();
});

deleteChatBtn.forEach((btn: Element): void => {
  const makeChatSpinnerWrapperVisible = (): void => {
    setTimeout((): void => {
      setVisibility(chatSpinnerWrapper, false);
    }, 500);
  };

  btn.addEventListener('click', (): void => {
    setVisibility(chatSpinnerWrapper, true);
    POSTRequest(
      '/home',
      { chatMessageId: btn.id },
      (responseData: any): void => {
        if (responseData !== 'false') {
          const messagesWrapper: HTMLElement =
            document.getElementById('messages-wrapper')!;
          messagesWrapper.removeChild(btn.parentElement!.parentElement!);
          makeChatSpinnerWrapperVisible();
        } else {
          makeChatSpinnerWrapperVisible();
        }
      }
    );
  });
});

window.addEventListener('load', (): void => {
  if (document.getElementById('admin-wrapper')) {
    const adminAlert: HTMLElement = document.getElementById('admin-alert')!;
    adminAlert.style.display = 'block';
    setTimeout((): void => {
      adminAlert.style.display = 'none';
    }, 8000);
  }
  scrollToLastChat();
});

const clearChatMessage = (): void => setValue(chatMessage, '');

const storeChatMessage = (): void => {
  const serverError: HTMLElement = document.getElementById('server-error')!;

  setVisibility(chatMessageSpinnerWrapper, true);
  POSTRequest(
    '/home',
    { chat: chatMessage.value.trim() },
    (responseData: any): void => {
      if (responseData.status === 'false') {
        setTimeout((): void => {
          setVisibility(serverError, true);
          setVisibility(chatMessageSpinnerWrapper, false);
          clearChatMessage();
        }, 500);
      } else {
        console.log(responseData);
        socket.emit('chat-sent', {
          firstName: JSON.parse(responseData).client.firstName,
          lastName: JSON.parse(responseData).client.lastName,
          createdAt: JSON.parse(responseData).createdAt,
          isAdmin: JSON.parse(responseData).isAdmin,
          id: JSON.parse(responseData).id
          chat: chatMessage.value.trim(),
        });
        scrollToLastChat();
        setTimeout((): void => {
          setVisibility(chatMessageSpinnerWrapper, false);
          clearChatMessage();
        }, 500);
      }
    }
  );
};

const clearChat = (): void => {
  const chatMessagesWrapper: HTMLElement =
    document.getElementById('messages-wrapper')!;
  setInnerHTML(chatMessagesWrapper, '');

  alert(
    'Chat was cleared! But do not worry; once you refresh the page, past chats will be re-populated.'
  );
};

const scrollToLastChat = (): void => {
  const chatMessages: NodeListOf<Element> =
    document.querySelectorAll('.message-wrapper');
  chatMessages[chatMessages.length - 1].scrollIntoView({ behavior: 'smooth' });
};
