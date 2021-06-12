const chatMessage: HTMLElement = document.getElementById('message')!;
const chatMessageSpinnerWrapper: HTMLElement = document.getElementById(
  'chat-spinner-wrapper'
)!;

window.addEventListener('load', (): void => {
  if (document.getElementById('admin-wrapper')) {
    const adminAlert = document.getElementById('admin-alert')!;
    adminAlert.style.display = 'block';
    setTimeout(() => {
      adminAlert.style.display = 'none';
    }, 8000);
  }
  scrollToLastChat();
});

const clearChatMessage = (): void => setValue(chatMessage, '');

const storeChatMessage = (): void => {
  const serverError: HTMLElement = document.getElementById('sever-error')!;

  setVisibility(chatMessageSpinnerWrapper, true);
  POSTRequest(
    '/home',
    { chat: chatMessage.value.trim() },
    (responseData): void => {
      if (!responseData) {
        setTimeout((): void => {
          setVisibility(chatMessageSpinnerWrapper, false);
          setVisibility(serverError, true);
          clearChatMessage();
        }, 500);
      } else {
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
