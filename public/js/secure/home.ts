const chatMessage: HTMLElement = document.getElementById('message')!;
const chatMessageSpinnerWrapper: HTMLElement = document.getElementById(
  'chat-spinner-wrapper'
)!;
const deleteChatBtn: NodeListOf<Element> =
  document.querySelectorAll('.delete-chat-btn');
const chatSpinnerWrapper = document.getElementById('chat-spinner-wrapper')!;

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
  const serverError: HTMLElement = document.getElementById('sever-error')!;

  setVisibility(chatMessageSpinnerWrapper, true);
  POSTRequest(
    '/home',
    { chat: chatMessage.value.trim() },
    (responseData: any): void => {
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
